import { NextRequest, NextResponse } from "next/server";

const UPLOAD_URL = "https://files.aoac.in/upload.php";
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Check file size (1MB limit)
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 1MB limit" },
        { status: 400 }
      );
    }

    // Check if it's an image
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "File must be an image" },
        { status: 400 }
      );
    }

    // Create FormData to send to PHP endpoint
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    // Upload to files.aoac.in
    const uploadResponse = await fetch(UPLOAD_URL, {
      method: "POST",
      body: uploadFormData,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error("Upload error:", errorText);
      return NextResponse.json(
        { success: false, error: "Failed to upload file to server" },
        { status: 500 }
      );
    }

    let uploadResult;
    try {
      uploadResult = await uploadResponse.json();
    } catch (error) {
      const errorText = await uploadResponse.text();
      console.error("Invalid JSON response:", errorText);
      return NextResponse.json(
        { success: false, error: "Invalid response from upload server" },
        { status: 500 }
      );
    }

    // Check if PHP returned an error
    if (!uploadResult.success) {
      return NextResponse.json(
        { success: false, error: uploadResult.error || "Upload failed" },
        { status: 400 }
      );
    }

    // Return the URL from PHP response
    if (uploadResult.url) {
      return NextResponse.json({
        success: true,
        url: uploadResult.url,
      });
    }

    // Fallback: construct URL from filename if provided
    if (uploadResult.filename) {
      const imageUrl = `https://files.aoac.in/uploads/${uploadResult.filename}`;
      return NextResponse.json({
        success: true,
        url: imageUrl,
      });
    }

    return NextResponse.json(
      { success: false, error: "No URL returned from upload server" },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}

