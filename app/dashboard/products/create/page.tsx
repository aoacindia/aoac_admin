"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import Cropper, { Area } from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Category {
  id: string;
  name: string;
}

interface Nutrition {
  name: string;
  grams: string;
}

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>("");
  const [mainImageUrl, setMainImageUrl] = useState<string>("");
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalImagesPreviews, setAdditionalImagesPreviews] = useState<string[]>([]);
  const [additionalImagesUrls, setAdditionalImagesUrls] = useState<string[]>([]);
  const [uploadingMainImage, setUploadingMainImage] = useState(false);
  const [uploadingAdditionalImages, setUploadingAdditionalImages] = useState(false);
  const [mainImageProgress, setMainImageProgress] = useState({ status: "", progress: 0 });
  const [additionalImagesProgress, setAdditionalImagesProgress] = useState<{ [key: number]: { status: string; progress: number } }>({});
  const [nutritionValues, setNutritionValues] = useState<Nutrition[]>([{ name: "", grams: "" }]);
  
  // Crop modal state
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImage, setCropImage] = useState<string>("");
  const [cropFile, setCropFile] = useState<File | null>(null);
  const [cropType, setCropType] = useState<"main" | "additional">("main");
  const [cropIndex, setCropIndex] = useState<number>(-1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const additionalImagesInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    regularPrice: "",
    length: "",
    breadth: "",
    height: "",
    weight: "",
    packingWeight: "",
    tax: "",
    hsnsac: "",
    mainImage: "",
    images: "",
    inStock: true,
    approved: false,
    stockCount: "",
    categoryId: "",
    vegetable: false,
    veg: false,
    frozen: false,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Check if image is a perfect square
  const isImageSquare = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img.width === img.height);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(false);
      };
      img.src = url;
    });
  };

  // Get cropped image as File
  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
    fileName: string
  ): Promise<File> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    // Set canvas size to the cropped area
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Draw the cropped image
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          const file = new File([blob], fileName, { type: blob.type });
          resolve(file);
        },
        "image/jpeg",
        0.95
      );
    });
  };

  const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });
  };

  // Compress image to 1MB or less
  const compressImage = async (file: File, onProgress?: (progress: number) => void): Promise<File> => {
    const maxSizeMB = 1;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    // If file is already under 1MB, return as is
    if (file.size <= maxSizeBytes) {
      return file;
    }

    // Calculate target size (slightly less than 1MB to ensure we're under)
    const targetSizeMB = 0.95;
    
    const options = {
      maxSizeMB: targetSizeMB,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: file.type,
      onProgress: (progress: number) => {
        if (onProgress) {
          onProgress(progress);
        }
      },
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Compression error:", error);
      // If compression fails, return original file
      return file;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? value
          : value,
    }));
  };

  // Handle crop confirmation
  const handleCropComplete = async () => {
    if (!cropFile || !croppedAreaPixels) return;

    try {
      const croppedFile = await getCroppedImg(
        cropImage,
        croppedAreaPixels,
        cropFile.name
      );

      const currentCropType = cropType;
      const currentCropIndex = cropIndex;

      // Close crop modal
      setCropModalOpen(false);
      URL.revokeObjectURL(cropImage);
      setCropImage("");
      setCropFile(null);
      setCroppedAreaPixels(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);

      // Process the cropped image
      if (currentCropType === "main") {
        // Update preview with cropped image
        const newPreview = URL.createObjectURL(croppedFile);
        setMainImagePreview(newPreview);
        await processMainImage(croppedFile);
      } else {
        // Update preview with cropped image
        const newPreview = URL.createObjectURL(croppedFile);
        setAdditionalImagesPreviews((prev) => {
          const updated = [...prev];
          URL.revokeObjectURL(updated[currentCropIndex]);
          updated[currentCropIndex] = newPreview;
          return updated;
        });
        // Update the file in state
        setAdditionalImages((prev) => {
          const updated = [...prev];
          updated[currentCropIndex] = croppedFile;
          return updated;
        });
        await processAdditionalImage(croppedFile, currentCropIndex);
      }
    } catch (error: any) {
      alert("Error cropping image: " + error.message);
      setCropModalOpen(false);
      setCropImage("");
      setCropFile(null);
    }
  };

  // Process main image (after crop if needed)
  const processMainImage = async (file: File) => {
    setMainImageFile(file);
    const preview = URL.createObjectURL(file);
    setMainImagePreview(preview);

    setUploadingMainImage(true);
    setMainImageProgress({ status: "Processing...", progress: 0 });

    try {
      let fileToUpload = file;
      
      // Check if file needs compression
      if (file.size > 1 * 1024 * 1024) {
        setMainImageProgress({ status: "Compressing image...", progress: 0 });
        fileToUpload = await compressImage(file, (progress) => {
          setMainImageProgress({ status: "Compressing image...", progress: progress });
        });
        setMainImageProgress({ status: "Compression complete! Uploading...", progress: 100 });
      } else {
        setMainImageProgress({ status: "Uploading...", progress: 0 });
      }

      const formData = new FormData();
      formData.append("file", fileToUpload);

      // Simulate upload progress (since fetch doesn't support progress natively)
      setMainImageProgress({ status: "Uploading...", progress: 50 });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      setMainImageProgress({ status: "Uploading...", progress: 90 });

      const data = await response.json();
      if (data.success) {
        setMainImageProgress({ status: "Upload complete!", progress: 100 });
        setMainImageUrl(data.url);
        setFormData((prev) => ({ ...prev, mainImage: data.url }));
        
        // Clear progress after a short delay
        setTimeout(() => {
          setMainImageProgress({ status: "", progress: 0 });
        }, 2000);
      } else {
        alert("Failed to upload main image: " + data.error);
        setMainImageFile(null);
        setMainImagePreview("");
        setMainImageProgress({ status: "", progress: 0 });
      }
    } catch (error: any) {
      alert("Error uploading main image: " + error.message);
      setMainImageFile(null);
      setMainImagePreview("");
      setMainImageProgress({ status: "", progress: 0 });
    } finally {
      setUploadingMainImage(false);
    }
  };

  // Handle main image upload
  const handleMainImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Check if image is square
    const isSquare = await isImageSquare(file);
    
    if (!isSquare) {
      // Show crop modal
      const preview = URL.createObjectURL(file);
      setCropImage(preview);
      setCropFile(file);
      setCropType("main");
      setCropModalOpen(true);
      return;
    }

    // If square, process directly
    await processMainImage(file);
  };

  // Process additional image (after crop if needed)
  const processAdditionalImage = async (file: File, index: number) => {
    const fileIndex = index;
    
    // Initialize progress for this file
    setAdditionalImagesProgress((prev) => ({
      ...prev,
      [fileIndex]: { status: "Processing...", progress: 0 },
    }));

    let fileToUpload = file;
    
    // Check if file needs compression
    if (file.size > 1 * 1024 * 1024) {
      setAdditionalImagesProgress((prev) => ({
        ...prev,
        [fileIndex]: { status: "Compressing...", progress: 0 },
      }));
      
      fileToUpload = await compressImage(file, (progress) => {
        setAdditionalImagesProgress((prev) => ({
          ...prev,
          [fileIndex]: { status: "Compressing...", progress: progress },
        }));
      });
      
      setAdditionalImagesProgress((prev) => ({
        ...prev,
        [fileIndex]: { status: "Uploading...", progress: 50 },
      }));
    } else {
      setAdditionalImagesProgress((prev) => ({
        ...prev,
        [fileIndex]: { status: "Uploading...", progress: 0 },
      }));
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);
    
    setAdditionalImagesProgress((prev) => ({
      ...prev,
      [fileIndex]: { status: "Uploading...", progress: 50 },
    }));

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    
    setAdditionalImagesProgress((prev) => ({
      ...prev,
      [fileIndex]: { status: "Uploading...", progress: 90 },
    }));

    const data = await response.json();
    if (data.success) {
      setAdditionalImagesProgress((prev) => ({
        ...prev,
        [fileIndex]: { status: "Complete!", progress: 100 },
      }));
      
      // Update the URL for this image
      setAdditionalImagesUrls((prev) => {
        const newUrls = [...prev];
        newUrls[fileIndex] = data.url;
        return newUrls;
      });
      
      // Clear progress after a short delay
      setTimeout(() => {
        setAdditionalImagesProgress((prev) => {
          const newProgress = { ...prev };
          delete newProgress[fileIndex];
          return newProgress;
        });
      }, 2000);
    } else {
      throw new Error(data.error || "Upload failed");
    }
  };

  // Handle additional images upload
  const handleAdditionalImagesUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];

    for (const file of fileArray) {
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} is not an image. Skipping.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    const startIndex = additionalImages.length;
    
    // Process each file - check if square, crop if needed
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      const isSquare = await isImageSquare(file);
      
      if (!isSquare) {
        // Show crop modal for this file
        const preview = URL.createObjectURL(file);
        setCropImage(preview);
        setCropFile(file);
        setCropType("additional");
        setCropIndex(startIndex + i);
        setCropModalOpen(true);
        
        // Add to state but mark as pending
        setAdditionalImages((prev) => [...prev, file]);
        setAdditionalImagesPreviews((prev) => [...prev, preview]);
        
        // Wait for crop modal to close (handled by handleCropComplete)
        // We'll process the rest after crop is done
        return;
      } else {
        // If square, add to state and process
        const preview = URL.createObjectURL(file);
        setAdditionalImages((prev) => [...prev, file]);
        setAdditionalImagesPreviews((prev) => [...prev, preview]);
        await processAdditionalImage(file, startIndex + i);
      }
    }
  };

  // Drag and drop handlers for main image
  const handleMainImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleMainImageUpload(file);
    }
  };

  const handleMainImageDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Drag and drop handlers for additional images
  const handleAdditionalImagesDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleAdditionalImagesUpload(files);
    }
  };

  const handleAdditionalImagesDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Remove additional image
  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
    setAdditionalImagesPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
    setAdditionalImagesUrls((prev) => {
      const newUrls = prev.filter((_, i) => i !== index);
      setFormData((form) => ({
        ...form,
        images: JSON.stringify(newUrls),
      }));
      return newUrls;
    });
    // Clean up progress state
    setAdditionalImagesProgress((prev) => {
      const newProgress: { [key: number]: { status: string; progress: number } } = {};
      Object.keys(prev).forEach((key) => {
        const keyNum = parseInt(key);
        if (keyNum < index) {
          newProgress[keyNum] = prev[keyNum];
        } else if (keyNum > index) {
          newProgress[keyNum - 1] = prev[keyNum];
        }
      });
      return newProgress;
    });
  };

  // Nutrition handlers
  const addNutritionLine = () => {
    setNutritionValues((prev) => [...prev, { name: "", grams: "" }]);
  };

  const removeNutritionLine = (index: number) => {
    if (nutritionValues.length > 1) {
      setNutritionValues((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateNutritionValue = (index: number, field: keyof Nutrition, value: string) => {
    setNutritionValues((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ensure images are properly formatted
      let imagesArray = null;
      if (additionalImagesUrls.length > 0) {
        imagesArray = additionalImagesUrls;
      } else if (formData.images) {
        try {
          const parsed = typeof formData.images === 'string' 
            ? JSON.parse(formData.images) 
            : formData.images;
          imagesArray = Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
        } catch {
          imagesArray = null;
        }
      }

      // Filter out empty nutrition values
      const validNutrition = nutritionValues.filter(
        (n) => n.name.trim() !== "" && n.grams.trim() !== ""
      );

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          mainImage: mainImageUrl || formData.mainImage || null,
          images: imagesArray,
          nutrition: validNutrition.map((n) => ({
            name: n.name,
            grams: parseFloat(n.grams) || 0,
          })),
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/dashboard/products");
      } else {
        alert("Error creating product: " + data.error);
      }
    } catch (error: any) {
      alert("Error creating product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Crop Modal */}
      {cropModalOpen && cropImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Crop Image to Square
            </h2>
            <div className="relative w-full h-96 mb-4">
              <Cropper
                image={cropImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(croppedArea, croppedAreaPixels) => {
                  setCroppedAreaPixels(croppedAreaPixels);
                }}
                restrictPosition={false}
                style={{
                  containerStyle: {
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  },
                }}
              />
            </div>
            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                onClick={() => {
                  setCropModalOpen(false);
                  URL.revokeObjectURL(cropImage);
                  setCropImage("");
                  setCropFile(null);
                  setCroppedAreaPixels(null);
                  setCrop({ x: 0, y: 0 });
                  setZoom(1);
                  
                  // Remove from state if it was added
                  if (cropType === "additional" && cropIndex >= 0) {
                    setAdditionalImages((prev) => prev.filter((_, i) => i !== cropIndex));
                    setAdditionalImagesPreviews((prev) => {
                      URL.revokeObjectURL(prev[cropIndex]);
                      return prev.filter((_, i) => i !== cropIndex);
                    });
                  } else if (cropType === "main") {
                    setMainImageFile(null);
                    setMainImagePreview("");
                  }
                }}
                className="px-6 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleCropComplete}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Confirm Crop
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 md:p-8">
        <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
          Create Product
        </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Add a new product to your inventory
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Product Name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>

            {/* Price */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Price <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Regular Price */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Regular Price
              </Label>
              <Input
                type="number"
                step="0.01"
                name="regularPrice"
                value={formData.regularPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Tax */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Tax (%) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="tax"
                value={formData.tax}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* HSN/SAC */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                HSN/SAC
              </Label>
              <Input
                type="text"
                name="hsnsac"
                value={formData.hsnsac}
                onChange={handleChange}
                placeholder="Enter HSN/SAC code"
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Dimensions */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Length (cm)
              </Label>
              <Input
                type="number"
                step="0.01"
                name="length"
                value={formData.length}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Breadth (cm)
              </Label>
              <Input
                type="number"
                step="0.01"
                name="breadth"
                value={formData.breadth}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Height (cm)
              </Label>
              <Input
                type="number"
                step="0.01"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Weight */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Weight (kg)
              </Label>
              <Input
                type="number"
                step="0.01"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Packing Weight */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Packing Weight (kg)
              </Label>
              <Input
                type="number"
                step="0.01"
                name="packingWeight"
                value={formData.packingWeight}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Stock Count */}
            <div>
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Stock Count
              </Label>
              <Input
                type="number"
                name="stockCount"
                value={formData.stockCount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Main Image Upload */}
            <div className="md:col-span-2">
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Main Image <span className="text-red-500">*</span>
              </Label>
              <div
                onDrop={handleMainImageDrop}
                onDragOver={handleMainImageDragOver}
                className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => mainImageInputRef.current?.click()}
              >
                <Input
                  ref={mainImageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleMainImageUpload(file);
                  }}
                />
                {mainImagePreview ? (
                  <div className="relative inline-block w-full">
                    <img
                      src={mainImagePreview}
                      alt="Main preview"
                      className="max-h-48 rounded-lg mx-auto"
                    />
                    {(uploadingMainImage || mainImageProgress.status) && (
                      <div className="absolute inset-0 bg-black bg-opacity-70 rounded-lg flex flex-col items-center justify-center p-4">
                        <span className="text-white text-sm font-medium mb-2">
                          {mainImageProgress.status || "Processing..."}
                        </span>
                        <div className="w-full max-w-xs bg-zinc-700 rounded-full h-2.5">
                          <div
                            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${mainImageProgress.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-xs mt-2">
                          {Math.round(mainImageProgress.progress)}%
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Drag and drop your main image here, or click to select
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                      Images larger than 1MB will be automatically compressed
                    </p>
                  </div>
                )}
              </div>
              {mainImageUrl && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                  ✓ Image uploaded: {mainImageUrl}
                </p>
              )}
            </div>

            {/* Additional Images Upload */}
            <div className="md:col-span-2">
              <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Additional Images
              </Label>
              <div
                onDrop={handleAdditionalImagesDrop}
                onDragOver={handleAdditionalImagesDragOver}
                className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => additionalImagesInputRef.current?.click()}
              >
                <Input
                  ref={additionalImagesInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) handleAdditionalImagesUpload(files);
                  }}
                />
                <p className="text-zinc-600 dark:text-zinc-400">
                  Drag and drop additional images here, or click to select
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                  Images larger than 1MB will be automatically compressed | You can select multiple images
                </p>
                {uploadingAdditionalImages && (
                  <p className="text-blue-600 dark:text-blue-400 mt-2">
                    Processing images...
                  </p>
                )}
              </div>

              {/* Additional Images Preview */}
              {additionalImagesPreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {additionalImagesPreviews.map((preview, index) => {
                    const progress = additionalImagesProgress[index];
                    return (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Additional ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        {progress && progress.status && (
                          <div className="absolute inset-0 bg-black bg-opacity-70 rounded-lg flex flex-col items-center justify-center p-2">
                            <span className="text-white text-xs font-medium mb-1 text-center">
                              {progress.status}
                            </span>
                            <div className="w-full bg-zinc-700 rounded-full h-1.5">
                              <div
                                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${progress.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-white text-xs mt-1">
                              {Math.round(progress.progress)}%
                            </span>
                          </div>
                        )}
                        <Button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 z-10"
                        >
                          ×
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Description
            </Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Nutrition Section */}
          <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                Nutrition Information
              </h3>
              <Button
                type="button"
                onClick={addNutritionLine}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
              >
                Add More
              </Button>
            </div>
            <div className="space-y-4">
              {nutritionValues.map((nutrition, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-5">
                    <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Nutrition Name
                    </Label>
                    <Input
                      type="text"
                      value={nutrition.name}
                      onChange={(e) =>
                        updateNutritionValue(index, "name", e.target.value)
                      }
                      placeholder="e.g., Protein, Carbohydrates"
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-5">
                    <Label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Grams
                    </Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={nutrition.grams}
                      onChange={(e) =>
                        updateNutritionValue(index, "grams", e.target.value)
                      }
                      placeholder="0.00"
                      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    {nutritionValues.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeNutritionLine(index)}
                        className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Label className="flex items-center space-x-2 cursor-pointer">
                <Input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  In Stock
                </span>
              </Label>

              <Label className="flex items-center space-x-2 cursor-pointer">
                <Input
                  type="checkbox"
                  name="approved"
                  checked={formData.approved}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  Approved
                </span>
              </Label>
            </div>

            {/* Product Type Switches */}
            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
              <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                Product Type
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Label className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="checkbox"
                    name="vegetable"
                    checked={formData.vegetable}
                    onChange={handleChange}
                    className="w-4 h-4 text-green-600 border-zinc-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    Vegetable
                  </span>
                </Label>

                <Label className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="checkbox"
                    name="veg"
                    checked={formData.veg}
                    onChange={handleChange}
                    className="w-4 h-4 text-green-600 border-zinc-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    Veg
                  </span>
                </Label>

                <Label className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="checkbox"
                    name="frozen"
                    checked={formData.frozen}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    Frozen
                  </span>
                </Label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Product"}
            </Button>
            <Button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

