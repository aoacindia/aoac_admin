
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model CategoryWeightDiscount
 * 
 */
export type CategoryWeightDiscount = $Result.DefaultSelection<Prisma.$CategoryWeightDiscountPayload>
/**
 * Model ProductDiscountPrice
 * 
 */
export type ProductDiscountPrice = $Result.DefaultSelection<Prisma.$ProductDiscountPricePayload>
/**
 * Model ProductWeightDiscount
 * 
 */
export type ProductWeightDiscount = $Result.DefaultSelection<Prisma.$ProductWeightDiscountPayload>
/**
 * Model ProductNutrition
 * 
 */
export type ProductNutrition = $Result.DefaultSelection<Prisma.$ProductNutritionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Categories
 * const categories = await prisma.category.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Categories
   * const categories = await prisma.category.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categoryWeightDiscount`: Exposes CRUD operations for the **CategoryWeightDiscount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CategoryWeightDiscounts
    * const categoryWeightDiscounts = await prisma.categoryWeightDiscount.findMany()
    * ```
    */
  get categoryWeightDiscount(): Prisma.CategoryWeightDiscountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productDiscountPrice`: Exposes CRUD operations for the **ProductDiscountPrice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductDiscountPrices
    * const productDiscountPrices = await prisma.productDiscountPrice.findMany()
    * ```
    */
  get productDiscountPrice(): Prisma.ProductDiscountPriceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productWeightDiscount`: Exposes CRUD operations for the **ProductWeightDiscount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductWeightDiscounts
    * const productWeightDiscounts = await prisma.productWeightDiscount.findMany()
    * ```
    */
  get productWeightDiscount(): Prisma.ProductWeightDiscountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productNutrition`: Exposes CRUD operations for the **ProductNutrition** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductNutritions
    * const productNutritions = await prisma.productNutrition.findMany()
    * ```
    */
  get productNutrition(): Prisma.ProductNutritionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.1
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Category: 'Category',
    Product: 'Product',
    CategoryWeightDiscount: 'CategoryWeightDiscount',
    ProductDiscountPrice: 'ProductDiscountPrice',
    ProductWeightDiscount: 'ProductWeightDiscount',
    ProductNutrition: 'ProductNutrition'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "category" | "product" | "categoryWeightDiscount" | "productDiscountPrice" | "productWeightDiscount" | "productNutrition"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      CategoryWeightDiscount: {
        payload: Prisma.$CategoryWeightDiscountPayload<ExtArgs>
        fields: Prisma.CategoryWeightDiscountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryWeightDiscountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryWeightDiscountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryWeightDiscountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryWeightDiscountPayload>
          }
          findFirst: {
            args: Prisma.CategoryWeightDiscountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryWeightDiscountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryWeightDiscountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryWeightDiscountPayload>
          }
          findMany: {
            args: Prisma.CategoryWeightDiscountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryWeightDiscountPayload>[]
          }
          create: {
            args: Prisma.CategoryWeightDiscountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryWeightDiscountPayload>
          }
          createMany: {
            args: Prisma.CategoryWeightDiscountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CategoryWeightDiscountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryWeightDiscountPayload>
          }
          update: {
            args: Prisma.CategoryWeightDiscountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryWeightDiscountPayload>
          }
          deleteMany: {
            args: Prisma.CategoryWeightDiscountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryWeightDiscountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryWeightDiscountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryWeightDiscountPayload>
          }
          aggregate: {
            args: Prisma.CategoryWeightDiscountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoryWeightDiscount>
          }
          groupBy: {
            args: Prisma.CategoryWeightDiscountGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryWeightDiscountGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryWeightDiscountCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryWeightDiscountCountAggregateOutputType> | number
          }
        }
      }
      ProductDiscountPrice: {
        payload: Prisma.$ProductDiscountPricePayload<ExtArgs>
        fields: Prisma.ProductDiscountPriceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductDiscountPriceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscountPricePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductDiscountPriceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscountPricePayload>
          }
          findFirst: {
            args: Prisma.ProductDiscountPriceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscountPricePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductDiscountPriceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscountPricePayload>
          }
          findMany: {
            args: Prisma.ProductDiscountPriceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscountPricePayload>[]
          }
          create: {
            args: Prisma.ProductDiscountPriceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscountPricePayload>
          }
          createMany: {
            args: Prisma.ProductDiscountPriceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductDiscountPriceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscountPricePayload>
          }
          update: {
            args: Prisma.ProductDiscountPriceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscountPricePayload>
          }
          deleteMany: {
            args: Prisma.ProductDiscountPriceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductDiscountPriceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductDiscountPriceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductDiscountPricePayload>
          }
          aggregate: {
            args: Prisma.ProductDiscountPriceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductDiscountPrice>
          }
          groupBy: {
            args: Prisma.ProductDiscountPriceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductDiscountPriceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductDiscountPriceCountArgs<ExtArgs>
            result: $Utils.Optional<ProductDiscountPriceCountAggregateOutputType> | number
          }
        }
      }
      ProductWeightDiscount: {
        payload: Prisma.$ProductWeightDiscountPayload<ExtArgs>
        fields: Prisma.ProductWeightDiscountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductWeightDiscountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductWeightDiscountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductWeightDiscountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductWeightDiscountPayload>
          }
          findFirst: {
            args: Prisma.ProductWeightDiscountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductWeightDiscountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductWeightDiscountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductWeightDiscountPayload>
          }
          findMany: {
            args: Prisma.ProductWeightDiscountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductWeightDiscountPayload>[]
          }
          create: {
            args: Prisma.ProductWeightDiscountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductWeightDiscountPayload>
          }
          createMany: {
            args: Prisma.ProductWeightDiscountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductWeightDiscountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductWeightDiscountPayload>
          }
          update: {
            args: Prisma.ProductWeightDiscountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductWeightDiscountPayload>
          }
          deleteMany: {
            args: Prisma.ProductWeightDiscountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductWeightDiscountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductWeightDiscountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductWeightDiscountPayload>
          }
          aggregate: {
            args: Prisma.ProductWeightDiscountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductWeightDiscount>
          }
          groupBy: {
            args: Prisma.ProductWeightDiscountGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductWeightDiscountGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductWeightDiscountCountArgs<ExtArgs>
            result: $Utils.Optional<ProductWeightDiscountCountAggregateOutputType> | number
          }
        }
      }
      ProductNutrition: {
        payload: Prisma.$ProductNutritionPayload<ExtArgs>
        fields: Prisma.ProductNutritionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductNutritionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductNutritionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductNutritionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductNutritionPayload>
          }
          findFirst: {
            args: Prisma.ProductNutritionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductNutritionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductNutritionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductNutritionPayload>
          }
          findMany: {
            args: Prisma.ProductNutritionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductNutritionPayload>[]
          }
          create: {
            args: Prisma.ProductNutritionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductNutritionPayload>
          }
          createMany: {
            args: Prisma.ProductNutritionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductNutritionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductNutritionPayload>
          }
          update: {
            args: Prisma.ProductNutritionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductNutritionPayload>
          }
          deleteMany: {
            args: Prisma.ProductNutritionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductNutritionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductNutritionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductNutritionPayload>
          }
          aggregate: {
            args: Prisma.ProductNutritionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductNutrition>
          }
          groupBy: {
            args: Prisma.ProductNutritionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductNutritionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductNutritionCountArgs<ExtArgs>
            result: $Utils.Optional<ProductNutritionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    category?: CategoryOmit
    product?: ProductOmit
    categoryWeightDiscount?: CategoryWeightDiscountOmit
    productDiscountPrice?: ProductDiscountPriceOmit
    productWeightDiscount?: ProductWeightDiscountOmit
    productNutrition?: ProductNutritionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    products: number
    weightDiscounts: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
    weightDiscounts?: boolean | CategoryCountOutputTypeCountWeightDiscountsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountWeightDiscountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWeightDiscountWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    discountPrices: number
    weightDiscounts: number
    nutrition: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discountPrices?: boolean | ProductCountOutputTypeCountDiscountPricesArgs
    weightDiscounts?: boolean | ProductCountOutputTypeCountWeightDiscountsArgs
    nutrition?: boolean | ProductCountOutputTypeCountNutritionArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountDiscountPricesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductDiscountPriceWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountWeightDiscountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWeightDiscountWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountNutritionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductNutritionWhereInput
  }


  /**
   * Count Type CategoryWeightDiscountCountOutputType
   */

  export type CategoryWeightDiscountCountOutputType = {
    productDiscounts: number
  }

  export type CategoryWeightDiscountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productDiscounts?: boolean | CategoryWeightDiscountCountOutputTypeCountProductDiscountsArgs
  }

  // Custom InputTypes
  /**
   * CategoryWeightDiscountCountOutputType without action
   */
  export type CategoryWeightDiscountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryWeightDiscountCountOutputType
     */
    select?: CategoryWeightDiscountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryWeightDiscountCountOutputType without action
   */
  export type CategoryWeightDiscountCountOutputTypeCountProductDiscountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductDiscountPriceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    products?: boolean | Category$productsArgs<ExtArgs>
    weightDiscounts?: boolean | Category$weightDiscountsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>



  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Category$productsArgs<ExtArgs>
    weightDiscounts?: boolean | Category$weightDiscountsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      products: Prisma.$ProductPayload<ExtArgs>[]
      weightDiscounts: Prisma.$CategoryWeightDiscountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    weightDiscounts<T extends Category$weightDiscountsArgs<ExtArgs> = {}>(args?: Subset<T, Category$weightDiscountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryWeightDiscountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category.weightDiscounts
   */
  export type Category$weightDiscountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryWeightDiscount
     */
    select?: CategoryWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryWeightDiscount
     */
    omit?: CategoryWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryWeightDiscountInclude<ExtArgs> | null
    where?: CategoryWeightDiscountWhereInput
    orderBy?: CategoryWeightDiscountOrderByWithRelationInput | CategoryWeightDiscountOrderByWithRelationInput[]
    cursor?: CategoryWeightDiscountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryWeightDiscountScalarFieldEnum | CategoryWeightDiscountScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: number | null
    regularPrice: number | null
    length: number | null
    breadth: number | null
    height: number | null
    weight: number | null
    packingWeight: number | null
    tax: number | null
    stockCount: number | null
  }

  export type ProductSumAggregateOutputType = {
    price: number | null
    regularPrice: number | null
    length: number | null
    breadth: number | null
    height: number | null
    weight: number | null
    packingWeight: number | null
    tax: number | null
    stockCount: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    description: string | null
    price: number | null
    regularPrice: number | null
    length: number | null
    breadth: number | null
    height: number | null
    weight: number | null
    packingWeight: number | null
    tax: number | null
    hsnsac: string | null
    mainImage: string | null
    inStock: boolean | null
    approved: boolean | null
    webVisible: boolean | null
    stockCount: number | null
    vegetable: boolean | null
    veg: boolean | null
    frozen: boolean | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
    approvedAt: Date | null
    approvedBy: string | null
    categoryId: string | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    description: string | null
    price: number | null
    regularPrice: number | null
    length: number | null
    breadth: number | null
    height: number | null
    weight: number | null
    packingWeight: number | null
    tax: number | null
    hsnsac: string | null
    mainImage: string | null
    inStock: boolean | null
    approved: boolean | null
    webVisible: boolean | null
    stockCount: number | null
    vegetable: boolean | null
    veg: boolean | null
    frozen: boolean | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
    approvedAt: Date | null
    approvedBy: string | null
    categoryId: string | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    code: number
    name: number
    description: number
    price: number
    regularPrice: number
    length: number
    breadth: number
    height: number
    weight: number
    packingWeight: number
    tax: number
    hsnsac: number
    mainImage: number
    images: number
    inStock: number
    approved: number
    webVisible: number
    stockCount: number
    vegetable: number
    veg: number
    frozen: number
    createdAt: number
    createdBy: number
    updatedAt: number
    updatedBy: number
    approvedAt: number
    approvedBy: number
    categoryId: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
    regularPrice?: true
    length?: true
    breadth?: true
    height?: true
    weight?: true
    packingWeight?: true
    tax?: true
    stockCount?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
    regularPrice?: true
    length?: true
    breadth?: true
    height?: true
    weight?: true
    packingWeight?: true
    tax?: true
    stockCount?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    price?: true
    regularPrice?: true
    length?: true
    breadth?: true
    height?: true
    weight?: true
    packingWeight?: true
    tax?: true
    hsnsac?: true
    mainImage?: true
    inStock?: true
    approved?: true
    webVisible?: true
    stockCount?: true
    vegetable?: true
    veg?: true
    frozen?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    approvedAt?: true
    approvedBy?: true
    categoryId?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    price?: true
    regularPrice?: true
    length?: true
    breadth?: true
    height?: true
    weight?: true
    packingWeight?: true
    tax?: true
    hsnsac?: true
    mainImage?: true
    inStock?: true
    approved?: true
    webVisible?: true
    stockCount?: true
    vegetable?: true
    veg?: true
    frozen?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    approvedAt?: true
    approvedBy?: true
    categoryId?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    price?: true
    regularPrice?: true
    length?: true
    breadth?: true
    height?: true
    weight?: true
    packingWeight?: true
    tax?: true
    hsnsac?: true
    mainImage?: true
    images?: true
    inStock?: true
    approved?: true
    webVisible?: true
    stockCount?: true
    vegetable?: true
    veg?: true
    frozen?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    approvedAt?: true
    approvedBy?: true
    categoryId?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    code: string
    name: string
    description: string | null
    price: number
    regularPrice: number | null
    length: number | null
    breadth: number | null
    height: number | null
    weight: number | null
    packingWeight: number | null
    tax: number
    hsnsac: string | null
    mainImage: string | null
    images: JsonValue | null
    inStock: boolean
    approved: boolean
    webVisible: boolean
    stockCount: number | null
    vegetable: boolean
    veg: boolean
    frozen: boolean
    createdAt: Date
    createdBy: string
    updatedAt: Date
    updatedBy: string
    approvedAt: Date | null
    approvedBy: string | null
    categoryId: string
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    regularPrice?: boolean
    length?: boolean
    breadth?: boolean
    height?: boolean
    weight?: boolean
    packingWeight?: boolean
    tax?: boolean
    hsnsac?: boolean
    mainImage?: boolean
    images?: boolean
    inStock?: boolean
    approved?: boolean
    webVisible?: boolean
    stockCount?: boolean
    vegetable?: boolean
    veg?: boolean
    frozen?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    approvedAt?: boolean
    approvedBy?: boolean
    categoryId?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    discountPrices?: boolean | Product$discountPricesArgs<ExtArgs>
    weightDiscounts?: boolean | Product$weightDiscountsArgs<ExtArgs>
    nutrition?: boolean | Product$nutritionArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>



  export type ProductSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    regularPrice?: boolean
    length?: boolean
    breadth?: boolean
    height?: boolean
    weight?: boolean
    packingWeight?: boolean
    tax?: boolean
    hsnsac?: boolean
    mainImage?: boolean
    images?: boolean
    inStock?: boolean
    approved?: boolean
    webVisible?: boolean
    stockCount?: boolean
    vegetable?: boolean
    veg?: boolean
    frozen?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    approvedAt?: boolean
    approvedBy?: boolean
    categoryId?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "description" | "price" | "regularPrice" | "length" | "breadth" | "height" | "weight" | "packingWeight" | "tax" | "hsnsac" | "mainImage" | "images" | "inStock" | "approved" | "webVisible" | "stockCount" | "vegetable" | "veg" | "frozen" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy" | "approvedAt" | "approvedBy" | "categoryId", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    discountPrices?: boolean | Product$discountPricesArgs<ExtArgs>
    weightDiscounts?: boolean | Product$weightDiscountsArgs<ExtArgs>
    nutrition?: boolean | Product$nutritionArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      discountPrices: Prisma.$ProductDiscountPricePayload<ExtArgs>[]
      weightDiscounts: Prisma.$ProductWeightDiscountPayload<ExtArgs>[]
      nutrition: Prisma.$ProductNutritionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      description: string | null
      price: number
      regularPrice: number | null
      length: number | null
      breadth: number | null
      height: number | null
      weight: number | null
      packingWeight: number | null
      tax: number
      hsnsac: string | null
      mainImage: string | null
      images: Prisma.JsonValue | null
      inStock: boolean
      approved: boolean
      webVisible: boolean
      stockCount: number | null
      vegetable: boolean
      veg: boolean
      frozen: boolean
      createdAt: Date
      createdBy: string
      updatedAt: Date
      updatedBy: string
      approvedAt: Date | null
      approvedBy: string | null
      categoryId: string
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    discountPrices<T extends Product$discountPricesArgs<ExtArgs> = {}>(args?: Subset<T, Product$discountPricesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductDiscountPricePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    weightDiscounts<T extends Product$weightDiscountsArgs<ExtArgs> = {}>(args?: Subset<T, Product$weightDiscountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductWeightDiscountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    nutrition<T extends Product$nutritionArgs<ExtArgs> = {}>(args?: Subset<T, Product$nutritionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductNutritionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly code: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Float'>
    readonly regularPrice: FieldRef<"Product", 'Float'>
    readonly length: FieldRef<"Product", 'Float'>
    readonly breadth: FieldRef<"Product", 'Float'>
    readonly height: FieldRef<"Product", 'Float'>
    readonly weight: FieldRef<"Product", 'Float'>
    readonly packingWeight: FieldRef<"Product", 'Float'>
    readonly tax: FieldRef<"Product", 'Int'>
    readonly hsnsac: FieldRef<"Product", 'String'>
    readonly mainImage: FieldRef<"Product", 'String'>
    readonly images: FieldRef<"Product", 'Json'>
    readonly inStock: FieldRef<"Product", 'Boolean'>
    readonly approved: FieldRef<"Product", 'Boolean'>
    readonly webVisible: FieldRef<"Product", 'Boolean'>
    readonly stockCount: FieldRef<"Product", 'Int'>
    readonly vegetable: FieldRef<"Product", 'Boolean'>
    readonly veg: FieldRef<"Product", 'Boolean'>
    readonly frozen: FieldRef<"Product", 'Boolean'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly createdBy: FieldRef<"Product", 'String'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
    readonly updatedBy: FieldRef<"Product", 'String'>
    readonly approvedAt: FieldRef<"Product", 'DateTime'>
    readonly approvedBy: FieldRef<"Product", 'String'>
    readonly categoryId: FieldRef<"Product", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.discountPrices
   */
  export type Product$discountPricesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscountPrice
     */
    select?: ProductDiscountPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscountPrice
     */
    omit?: ProductDiscountPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscountPriceInclude<ExtArgs> | null
    where?: ProductDiscountPriceWhereInput
    orderBy?: ProductDiscountPriceOrderByWithRelationInput | ProductDiscountPriceOrderByWithRelationInput[]
    cursor?: ProductDiscountPriceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductDiscountPriceScalarFieldEnum | ProductDiscountPriceScalarFieldEnum[]
  }

  /**
   * Product.weightDiscounts
   */
  export type Product$weightDiscountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductWeightDiscount
     */
    select?: ProductWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductWeightDiscount
     */
    omit?: ProductWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductWeightDiscountInclude<ExtArgs> | null
    where?: ProductWeightDiscountWhereInput
    orderBy?: ProductWeightDiscountOrderByWithRelationInput | ProductWeightDiscountOrderByWithRelationInput[]
    cursor?: ProductWeightDiscountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductWeightDiscountScalarFieldEnum | ProductWeightDiscountScalarFieldEnum[]
  }

  /**
   * Product.nutrition
   */
  export type Product$nutritionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNutrition
     */
    select?: ProductNutritionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductNutrition
     */
    omit?: ProductNutritionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductNutritionInclude<ExtArgs> | null
    where?: ProductNutritionWhereInput
    orderBy?: ProductNutritionOrderByWithRelationInput | ProductNutritionOrderByWithRelationInput[]
    cursor?: ProductNutritionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductNutritionScalarFieldEnum | ProductNutritionScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model CategoryWeightDiscount
   */

  export type AggregateCategoryWeightDiscount = {
    _count: CategoryWeightDiscountCountAggregateOutputType | null
    _avg: CategoryWeightDiscountAvgAggregateOutputType | null
    _sum: CategoryWeightDiscountSumAggregateOutputType | null
    _min: CategoryWeightDiscountMinAggregateOutputType | null
    _max: CategoryWeightDiscountMaxAggregateOutputType | null
  }

  export type CategoryWeightDiscountAvgAggregateOutputType = {
    minWeight: number | null
  }

  export type CategoryWeightDiscountSumAggregateOutputType = {
    minWeight: number | null
  }

  export type CategoryWeightDiscountMinAggregateOutputType = {
    id: string | null
    minWeight: number | null
    categoryId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryWeightDiscountMaxAggregateOutputType = {
    id: string | null
    minWeight: number | null
    categoryId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryWeightDiscountCountAggregateOutputType = {
    id: number
    minWeight: number
    categoryId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryWeightDiscountAvgAggregateInputType = {
    minWeight?: true
  }

  export type CategoryWeightDiscountSumAggregateInputType = {
    minWeight?: true
  }

  export type CategoryWeightDiscountMinAggregateInputType = {
    id?: true
    minWeight?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryWeightDiscountMaxAggregateInputType = {
    id?: true
    minWeight?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryWeightDiscountCountAggregateInputType = {
    id?: true
    minWeight?: true
    categoryId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryWeightDiscountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategoryWeightDiscount to aggregate.
     */
    where?: CategoryWeightDiscountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryWeightDiscounts to fetch.
     */
    orderBy?: CategoryWeightDiscountOrderByWithRelationInput | CategoryWeightDiscountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWeightDiscountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryWeightDiscounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryWeightDiscounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CategoryWeightDiscounts
    **/
    _count?: true | CategoryWeightDiscountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryWeightDiscountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategoryWeightDiscountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryWeightDiscountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryWeightDiscountMaxAggregateInputType
  }

  export type GetCategoryWeightDiscountAggregateType<T extends CategoryWeightDiscountAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoryWeightDiscount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoryWeightDiscount[P]>
      : GetScalarType<T[P], AggregateCategoryWeightDiscount[P]>
  }




  export type CategoryWeightDiscountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWeightDiscountWhereInput
    orderBy?: CategoryWeightDiscountOrderByWithAggregationInput | CategoryWeightDiscountOrderByWithAggregationInput[]
    by: CategoryWeightDiscountScalarFieldEnum[] | CategoryWeightDiscountScalarFieldEnum
    having?: CategoryWeightDiscountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryWeightDiscountCountAggregateInputType | true
    _avg?: CategoryWeightDiscountAvgAggregateInputType
    _sum?: CategoryWeightDiscountSumAggregateInputType
    _min?: CategoryWeightDiscountMinAggregateInputType
    _max?: CategoryWeightDiscountMaxAggregateInputType
  }

  export type CategoryWeightDiscountGroupByOutputType = {
    id: string
    minWeight: number
    categoryId: string
    createdAt: Date
    updatedAt: Date
    _count: CategoryWeightDiscountCountAggregateOutputType | null
    _avg: CategoryWeightDiscountAvgAggregateOutputType | null
    _sum: CategoryWeightDiscountSumAggregateOutputType | null
    _min: CategoryWeightDiscountMinAggregateOutputType | null
    _max: CategoryWeightDiscountMaxAggregateOutputType | null
  }

  type GetCategoryWeightDiscountGroupByPayload<T extends CategoryWeightDiscountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryWeightDiscountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryWeightDiscountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryWeightDiscountGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryWeightDiscountGroupByOutputType[P]>
        }
      >
    >


  export type CategoryWeightDiscountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    minWeight?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    productDiscounts?: boolean | CategoryWeightDiscount$productDiscountsArgs<ExtArgs>
    _count?: boolean | CategoryWeightDiscountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoryWeightDiscount"]>



  export type CategoryWeightDiscountSelectScalar = {
    id?: boolean
    minWeight?: boolean
    categoryId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryWeightDiscountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "minWeight" | "categoryId" | "createdAt" | "updatedAt", ExtArgs["result"]["categoryWeightDiscount"]>
  export type CategoryWeightDiscountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    productDiscounts?: boolean | CategoryWeightDiscount$productDiscountsArgs<ExtArgs>
    _count?: boolean | CategoryWeightDiscountCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CategoryWeightDiscountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CategoryWeightDiscount"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      productDiscounts: Prisma.$ProductDiscountPricePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      minWeight: number
      categoryId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["categoryWeightDiscount"]>
    composites: {}
  }

  type CategoryWeightDiscountGetPayload<S extends boolean | null | undefined | CategoryWeightDiscountDefaultArgs> = $Result.GetResult<Prisma.$CategoryWeightDiscountPayload, S>

  type CategoryWeightDiscountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryWeightDiscountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryWeightDiscountCountAggregateInputType | true
    }

  export interface CategoryWeightDiscountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CategoryWeightDiscount'], meta: { name: 'CategoryWeightDiscount' } }
    /**
     * Find zero or one CategoryWeightDiscount that matches the filter.
     * @param {CategoryWeightDiscountFindUniqueArgs} args - Arguments to find a CategoryWeightDiscount
     * @example
     * // Get one CategoryWeightDiscount
     * const categoryWeightDiscount = await prisma.categoryWeightDiscount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryWeightDiscountFindUniqueArgs>(args: SelectSubset<T, CategoryWeightDiscountFindUniqueArgs<ExtArgs>>): Prisma__CategoryWeightDiscountClient<$Result.GetResult<Prisma.$CategoryWeightDiscountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CategoryWeightDiscount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryWeightDiscountFindUniqueOrThrowArgs} args - Arguments to find a CategoryWeightDiscount
     * @example
     * // Get one CategoryWeightDiscount
     * const categoryWeightDiscount = await prisma.categoryWeightDiscount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryWeightDiscountFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryWeightDiscountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryWeightDiscountClient<$Result.GetResult<Prisma.$CategoryWeightDiscountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CategoryWeightDiscount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryWeightDiscountFindFirstArgs} args - Arguments to find a CategoryWeightDiscount
     * @example
     * // Get one CategoryWeightDiscount
     * const categoryWeightDiscount = await prisma.categoryWeightDiscount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryWeightDiscountFindFirstArgs>(args?: SelectSubset<T, CategoryWeightDiscountFindFirstArgs<ExtArgs>>): Prisma__CategoryWeightDiscountClient<$Result.GetResult<Prisma.$CategoryWeightDiscountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CategoryWeightDiscount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryWeightDiscountFindFirstOrThrowArgs} args - Arguments to find a CategoryWeightDiscount
     * @example
     * // Get one CategoryWeightDiscount
     * const categoryWeightDiscount = await prisma.categoryWeightDiscount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryWeightDiscountFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryWeightDiscountFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryWeightDiscountClient<$Result.GetResult<Prisma.$CategoryWeightDiscountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CategoryWeightDiscounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryWeightDiscountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CategoryWeightDiscounts
     * const categoryWeightDiscounts = await prisma.categoryWeightDiscount.findMany()
     * 
     * // Get first 10 CategoryWeightDiscounts
     * const categoryWeightDiscounts = await prisma.categoryWeightDiscount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWeightDiscountWithIdOnly = await prisma.categoryWeightDiscount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryWeightDiscountFindManyArgs>(args?: SelectSubset<T, CategoryWeightDiscountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryWeightDiscountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CategoryWeightDiscount.
     * @param {CategoryWeightDiscountCreateArgs} args - Arguments to create a CategoryWeightDiscount.
     * @example
     * // Create one CategoryWeightDiscount
     * const CategoryWeightDiscount = await prisma.categoryWeightDiscount.create({
     *   data: {
     *     // ... data to create a CategoryWeightDiscount
     *   }
     * })
     * 
     */
    create<T extends CategoryWeightDiscountCreateArgs>(args: SelectSubset<T, CategoryWeightDiscountCreateArgs<ExtArgs>>): Prisma__CategoryWeightDiscountClient<$Result.GetResult<Prisma.$CategoryWeightDiscountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CategoryWeightDiscounts.
     * @param {CategoryWeightDiscountCreateManyArgs} args - Arguments to create many CategoryWeightDiscounts.
     * @example
     * // Create many CategoryWeightDiscounts
     * const categoryWeightDiscount = await prisma.categoryWeightDiscount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryWeightDiscountCreateManyArgs>(args?: SelectSubset<T, CategoryWeightDiscountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CategoryWeightDiscount.
     * @param {CategoryWeightDiscountDeleteArgs} args - Arguments to delete one CategoryWeightDiscount.
     * @example
     * // Delete one CategoryWeightDiscount
     * const CategoryWeightDiscount = await prisma.categoryWeightDiscount.delete({
     *   where: {
     *     // ... filter to delete one CategoryWeightDiscount
     *   }
     * })
     * 
     */
    delete<T extends CategoryWeightDiscountDeleteArgs>(args: SelectSubset<T, CategoryWeightDiscountDeleteArgs<ExtArgs>>): Prisma__CategoryWeightDiscountClient<$Result.GetResult<Prisma.$CategoryWeightDiscountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CategoryWeightDiscount.
     * @param {CategoryWeightDiscountUpdateArgs} args - Arguments to update one CategoryWeightDiscount.
     * @example
     * // Update one CategoryWeightDiscount
     * const categoryWeightDiscount = await prisma.categoryWeightDiscount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryWeightDiscountUpdateArgs>(args: SelectSubset<T, CategoryWeightDiscountUpdateArgs<ExtArgs>>): Prisma__CategoryWeightDiscountClient<$Result.GetResult<Prisma.$CategoryWeightDiscountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CategoryWeightDiscounts.
     * @param {CategoryWeightDiscountDeleteManyArgs} args - Arguments to filter CategoryWeightDiscounts to delete.
     * @example
     * // Delete a few CategoryWeightDiscounts
     * const { count } = await prisma.categoryWeightDiscount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryWeightDiscountDeleteManyArgs>(args?: SelectSubset<T, CategoryWeightDiscountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CategoryWeightDiscounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryWeightDiscountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CategoryWeightDiscounts
     * const categoryWeightDiscount = await prisma.categoryWeightDiscount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryWeightDiscountUpdateManyArgs>(args: SelectSubset<T, CategoryWeightDiscountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CategoryWeightDiscount.
     * @param {CategoryWeightDiscountUpsertArgs} args - Arguments to update or create a CategoryWeightDiscount.
     * @example
     * // Update or create a CategoryWeightDiscount
     * const categoryWeightDiscount = await prisma.categoryWeightDiscount.upsert({
     *   create: {
     *     // ... data to create a CategoryWeightDiscount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CategoryWeightDiscount we want to update
     *   }
     * })
     */
    upsert<T extends CategoryWeightDiscountUpsertArgs>(args: SelectSubset<T, CategoryWeightDiscountUpsertArgs<ExtArgs>>): Prisma__CategoryWeightDiscountClient<$Result.GetResult<Prisma.$CategoryWeightDiscountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CategoryWeightDiscounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryWeightDiscountCountArgs} args - Arguments to filter CategoryWeightDiscounts to count.
     * @example
     * // Count the number of CategoryWeightDiscounts
     * const count = await prisma.categoryWeightDiscount.count({
     *   where: {
     *     // ... the filter for the CategoryWeightDiscounts we want to count
     *   }
     * })
    **/
    count<T extends CategoryWeightDiscountCountArgs>(
      args?: Subset<T, CategoryWeightDiscountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryWeightDiscountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CategoryWeightDiscount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryWeightDiscountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryWeightDiscountAggregateArgs>(args: Subset<T, CategoryWeightDiscountAggregateArgs>): Prisma.PrismaPromise<GetCategoryWeightDiscountAggregateType<T>>

    /**
     * Group by CategoryWeightDiscount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryWeightDiscountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryWeightDiscountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryWeightDiscountGroupByArgs['orderBy'] }
        : { orderBy?: CategoryWeightDiscountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryWeightDiscountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryWeightDiscountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CategoryWeightDiscount model
   */
  readonly fields: CategoryWeightDiscountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CategoryWeightDiscount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryWeightDiscountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    productDiscounts<T extends CategoryWeightDiscount$productDiscountsArgs<ExtArgs> = {}>(args?: Subset<T, CategoryWeightDiscount$productDiscountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductDiscountPricePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CategoryWeightDiscount model
   */
  interface CategoryWeightDiscountFieldRefs {
    readonly id: FieldRef<"CategoryWeightDiscount", 'String'>
    readonly minWeight: FieldRef<"CategoryWeightDiscount", 'Float'>
    readonly categoryId: FieldRef<"CategoryWeightDiscount", 'String'>
    readonly createdAt: FieldRef<"CategoryWeightDiscount", 'DateTime'>
    readonly updatedAt: FieldRef<"CategoryWeightDiscount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CategoryWeightDiscount findUnique
   */
  export type CategoryWeightDiscountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryWeightDiscount
     */
    select?: CategoryWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryWeightDiscount
     */
    omit?: CategoryWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryWeightDiscountInclude<ExtArgs> | null
    /**
     * Filter, which CategoryWeightDiscount to fetch.
     */
    where: CategoryWeightDiscountWhereUniqueInput
  }

  /**
   * CategoryWeightDiscount findUniqueOrThrow
   */
  export type CategoryWeightDiscountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryWeightDiscount
     */
    select?: CategoryWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryWeightDiscount
     */
    omit?: CategoryWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryWeightDiscountInclude<ExtArgs> | null
    /**
     * Filter, which CategoryWeightDiscount to fetch.
     */
    where: CategoryWeightDiscountWhereUniqueInput
  }

  /**
   * CategoryWeightDiscount findFirst
   */
  export type CategoryWeightDiscountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryWeightDiscount
     */
    select?: CategoryWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryWeightDiscount
     */
    omit?: CategoryWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryWeightDiscountInclude<ExtArgs> | null
    /**
     * Filter, which CategoryWeightDiscount to fetch.
     */
    where?: CategoryWeightDiscountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryWeightDiscounts to fetch.
     */
    orderBy?: CategoryWeightDiscountOrderByWithRelationInput | CategoryWeightDiscountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoryWeightDiscounts.
     */
    cursor?: CategoryWeightDiscountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryWeightDiscounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryWeightDiscounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategoryWeightDiscounts.
     */
    distinct?: CategoryWeightDiscountScalarFieldEnum | CategoryWeightDiscountScalarFieldEnum[]
  }

  /**
   * CategoryWeightDiscount findFirstOrThrow
   */
  export type CategoryWeightDiscountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryWeightDiscount
     */
    select?: CategoryWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryWeightDiscount
     */
    omit?: CategoryWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryWeightDiscountInclude<ExtArgs> | null
    /**
     * Filter, which CategoryWeightDiscount to fetch.
     */
    where?: CategoryWeightDiscountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryWeightDiscounts to fetch.
     */
    orderBy?: CategoryWeightDiscountOrderByWithRelationInput | CategoryWeightDiscountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoryWeightDiscounts.
     */
    cursor?: CategoryWeightDiscountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryWeightDiscounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryWeightDiscounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategoryWeightDiscounts.
     */
    distinct?: CategoryWeightDiscountScalarFieldEnum | CategoryWeightDiscountScalarFieldEnum[]
  }

  /**
   * CategoryWeightDiscount findMany
   */
  export type CategoryWeightDiscountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryWeightDiscount
     */
    select?: CategoryWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryWeightDiscount
     */
    omit?: CategoryWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryWeightDiscountInclude<ExtArgs> | null
    /**
     * Filter, which CategoryWeightDiscounts to fetch.
     */
    where?: CategoryWeightDiscountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryWeightDiscounts to fetch.
     */
    orderBy?: CategoryWeightDiscountOrderByWithRelationInput | CategoryWeightDiscountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CategoryWeightDiscounts.
     */
    cursor?: CategoryWeightDiscountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryWeightDiscounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryWeightDiscounts.
     */
    skip?: number
    distinct?: CategoryWeightDiscountScalarFieldEnum | CategoryWeightDiscountScalarFieldEnum[]
  }

  /**
   * CategoryWeightDiscount create
   */
  export type CategoryWeightDiscountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryWeightDiscount
     */
    select?: CategoryWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryWeightDiscount
     */
    omit?: CategoryWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryWeightDiscountInclude<ExtArgs> | null
    /**
     * The data needed to create a CategoryWeightDiscount.
     */
    data: XOR<CategoryWeightDiscountCreateInput, CategoryWeightDiscountUncheckedCreateInput>
  }

  /**
   * CategoryWeightDiscount createMany
   */
  export type CategoryWeightDiscountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CategoryWeightDiscounts.
     */
    data: CategoryWeightDiscountCreateManyInput | CategoryWeightDiscountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CategoryWeightDiscount update
   */
  export type CategoryWeightDiscountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryWeightDiscount
     */
    select?: CategoryWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryWeightDiscount
     */
    omit?: CategoryWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryWeightDiscountInclude<ExtArgs> | null
    /**
     * The data needed to update a CategoryWeightDiscount.
     */
    data: XOR<CategoryWeightDiscountUpdateInput, CategoryWeightDiscountUncheckedUpdateInput>
    /**
     * Choose, which CategoryWeightDiscount to update.
     */
    where: CategoryWeightDiscountWhereUniqueInput
  }

  /**
   * CategoryWeightDiscount updateMany
   */
  export type CategoryWeightDiscountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CategoryWeightDiscounts.
     */
    data: XOR<CategoryWeightDiscountUpdateManyMutationInput, CategoryWeightDiscountUncheckedUpdateManyInput>
    /**
     * Filter which CategoryWeightDiscounts to update
     */
    where?: CategoryWeightDiscountWhereInput
    /**
     * Limit how many CategoryWeightDiscounts to update.
     */
    limit?: number
  }

  /**
   * CategoryWeightDiscount upsert
   */
  export type CategoryWeightDiscountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryWeightDiscount
     */
    select?: CategoryWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryWeightDiscount
     */
    omit?: CategoryWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryWeightDiscountInclude<ExtArgs> | null
    /**
     * The filter to search for the CategoryWeightDiscount to update in case it exists.
     */
    where: CategoryWeightDiscountWhereUniqueInput
    /**
     * In case the CategoryWeightDiscount found by the `where` argument doesn't exist, create a new CategoryWeightDiscount with this data.
     */
    create: XOR<CategoryWeightDiscountCreateInput, CategoryWeightDiscountUncheckedCreateInput>
    /**
     * In case the CategoryWeightDiscount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryWeightDiscountUpdateInput, CategoryWeightDiscountUncheckedUpdateInput>
  }

  /**
   * CategoryWeightDiscount delete
   */
  export type CategoryWeightDiscountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryWeightDiscount
     */
    select?: CategoryWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryWeightDiscount
     */
    omit?: CategoryWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryWeightDiscountInclude<ExtArgs> | null
    /**
     * Filter which CategoryWeightDiscount to delete.
     */
    where: CategoryWeightDiscountWhereUniqueInput
  }

  /**
   * CategoryWeightDiscount deleteMany
   */
  export type CategoryWeightDiscountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategoryWeightDiscounts to delete
     */
    where?: CategoryWeightDiscountWhereInput
    /**
     * Limit how many CategoryWeightDiscounts to delete.
     */
    limit?: number
  }

  /**
   * CategoryWeightDiscount.productDiscounts
   */
  export type CategoryWeightDiscount$productDiscountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscountPrice
     */
    select?: ProductDiscountPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscountPrice
     */
    omit?: ProductDiscountPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscountPriceInclude<ExtArgs> | null
    where?: ProductDiscountPriceWhereInput
    orderBy?: ProductDiscountPriceOrderByWithRelationInput | ProductDiscountPriceOrderByWithRelationInput[]
    cursor?: ProductDiscountPriceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductDiscountPriceScalarFieldEnum | ProductDiscountPriceScalarFieldEnum[]
  }

  /**
   * CategoryWeightDiscount without action
   */
  export type CategoryWeightDiscountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryWeightDiscount
     */
    select?: CategoryWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryWeightDiscount
     */
    omit?: CategoryWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryWeightDiscountInclude<ExtArgs> | null
  }


  /**
   * Model ProductDiscountPrice
   */

  export type AggregateProductDiscountPrice = {
    _count: ProductDiscountPriceCountAggregateOutputType | null
    _avg: ProductDiscountPriceAvgAggregateOutputType | null
    _sum: ProductDiscountPriceSumAggregateOutputType | null
    _min: ProductDiscountPriceMinAggregateOutputType | null
    _max: ProductDiscountPriceMaxAggregateOutputType | null
  }

  export type ProductDiscountPriceAvgAggregateOutputType = {
    discountPrice: number | null
  }

  export type ProductDiscountPriceSumAggregateOutputType = {
    discountPrice: number | null
  }

  export type ProductDiscountPriceMinAggregateOutputType = {
    id: string | null
    productId: string | null
    discountId: string | null
    discountPrice: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductDiscountPriceMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    discountId: string | null
    discountPrice: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductDiscountPriceCountAggregateOutputType = {
    id: number
    productId: number
    discountId: number
    discountPrice: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductDiscountPriceAvgAggregateInputType = {
    discountPrice?: true
  }

  export type ProductDiscountPriceSumAggregateInputType = {
    discountPrice?: true
  }

  export type ProductDiscountPriceMinAggregateInputType = {
    id?: true
    productId?: true
    discountId?: true
    discountPrice?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductDiscountPriceMaxAggregateInputType = {
    id?: true
    productId?: true
    discountId?: true
    discountPrice?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductDiscountPriceCountAggregateInputType = {
    id?: true
    productId?: true
    discountId?: true
    discountPrice?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductDiscountPriceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductDiscountPrice to aggregate.
     */
    where?: ProductDiscountPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductDiscountPrices to fetch.
     */
    orderBy?: ProductDiscountPriceOrderByWithRelationInput | ProductDiscountPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductDiscountPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductDiscountPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductDiscountPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductDiscountPrices
    **/
    _count?: true | ProductDiscountPriceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductDiscountPriceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductDiscountPriceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductDiscountPriceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductDiscountPriceMaxAggregateInputType
  }

  export type GetProductDiscountPriceAggregateType<T extends ProductDiscountPriceAggregateArgs> = {
        [P in keyof T & keyof AggregateProductDiscountPrice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductDiscountPrice[P]>
      : GetScalarType<T[P], AggregateProductDiscountPrice[P]>
  }




  export type ProductDiscountPriceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductDiscountPriceWhereInput
    orderBy?: ProductDiscountPriceOrderByWithAggregationInput | ProductDiscountPriceOrderByWithAggregationInput[]
    by: ProductDiscountPriceScalarFieldEnum[] | ProductDiscountPriceScalarFieldEnum
    having?: ProductDiscountPriceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductDiscountPriceCountAggregateInputType | true
    _avg?: ProductDiscountPriceAvgAggregateInputType
    _sum?: ProductDiscountPriceSumAggregateInputType
    _min?: ProductDiscountPriceMinAggregateInputType
    _max?: ProductDiscountPriceMaxAggregateInputType
  }

  export type ProductDiscountPriceGroupByOutputType = {
    id: string
    productId: string
    discountId: string
    discountPrice: number
    createdAt: Date
    updatedAt: Date
    _count: ProductDiscountPriceCountAggregateOutputType | null
    _avg: ProductDiscountPriceAvgAggregateOutputType | null
    _sum: ProductDiscountPriceSumAggregateOutputType | null
    _min: ProductDiscountPriceMinAggregateOutputType | null
    _max: ProductDiscountPriceMaxAggregateOutputType | null
  }

  type GetProductDiscountPriceGroupByPayload<T extends ProductDiscountPriceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductDiscountPriceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductDiscountPriceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductDiscountPriceGroupByOutputType[P]>
            : GetScalarType<T[P], ProductDiscountPriceGroupByOutputType[P]>
        }
      >
    >


  export type ProductDiscountPriceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    discountId?: boolean
    discountPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    discount?: boolean | CategoryWeightDiscountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productDiscountPrice"]>



  export type ProductDiscountPriceSelectScalar = {
    id?: boolean
    productId?: boolean
    discountId?: boolean
    discountPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductDiscountPriceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "discountId" | "discountPrice" | "createdAt" | "updatedAt", ExtArgs["result"]["productDiscountPrice"]>
  export type ProductDiscountPriceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    discount?: boolean | CategoryWeightDiscountDefaultArgs<ExtArgs>
  }

  export type $ProductDiscountPricePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductDiscountPrice"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      discount: Prisma.$CategoryWeightDiscountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      discountId: string
      discountPrice: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productDiscountPrice"]>
    composites: {}
  }

  type ProductDiscountPriceGetPayload<S extends boolean | null | undefined | ProductDiscountPriceDefaultArgs> = $Result.GetResult<Prisma.$ProductDiscountPricePayload, S>

  type ProductDiscountPriceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductDiscountPriceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductDiscountPriceCountAggregateInputType | true
    }

  export interface ProductDiscountPriceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductDiscountPrice'], meta: { name: 'ProductDiscountPrice' } }
    /**
     * Find zero or one ProductDiscountPrice that matches the filter.
     * @param {ProductDiscountPriceFindUniqueArgs} args - Arguments to find a ProductDiscountPrice
     * @example
     * // Get one ProductDiscountPrice
     * const productDiscountPrice = await prisma.productDiscountPrice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductDiscountPriceFindUniqueArgs>(args: SelectSubset<T, ProductDiscountPriceFindUniqueArgs<ExtArgs>>): Prisma__ProductDiscountPriceClient<$Result.GetResult<Prisma.$ProductDiscountPricePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductDiscountPrice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductDiscountPriceFindUniqueOrThrowArgs} args - Arguments to find a ProductDiscountPrice
     * @example
     * // Get one ProductDiscountPrice
     * const productDiscountPrice = await prisma.productDiscountPrice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductDiscountPriceFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductDiscountPriceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductDiscountPriceClient<$Result.GetResult<Prisma.$ProductDiscountPricePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductDiscountPrice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscountPriceFindFirstArgs} args - Arguments to find a ProductDiscountPrice
     * @example
     * // Get one ProductDiscountPrice
     * const productDiscountPrice = await prisma.productDiscountPrice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductDiscountPriceFindFirstArgs>(args?: SelectSubset<T, ProductDiscountPriceFindFirstArgs<ExtArgs>>): Prisma__ProductDiscountPriceClient<$Result.GetResult<Prisma.$ProductDiscountPricePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductDiscountPrice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscountPriceFindFirstOrThrowArgs} args - Arguments to find a ProductDiscountPrice
     * @example
     * // Get one ProductDiscountPrice
     * const productDiscountPrice = await prisma.productDiscountPrice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductDiscountPriceFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductDiscountPriceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductDiscountPriceClient<$Result.GetResult<Prisma.$ProductDiscountPricePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductDiscountPrices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscountPriceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductDiscountPrices
     * const productDiscountPrices = await prisma.productDiscountPrice.findMany()
     * 
     * // Get first 10 ProductDiscountPrices
     * const productDiscountPrices = await prisma.productDiscountPrice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productDiscountPriceWithIdOnly = await prisma.productDiscountPrice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductDiscountPriceFindManyArgs>(args?: SelectSubset<T, ProductDiscountPriceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductDiscountPricePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductDiscountPrice.
     * @param {ProductDiscountPriceCreateArgs} args - Arguments to create a ProductDiscountPrice.
     * @example
     * // Create one ProductDiscountPrice
     * const ProductDiscountPrice = await prisma.productDiscountPrice.create({
     *   data: {
     *     // ... data to create a ProductDiscountPrice
     *   }
     * })
     * 
     */
    create<T extends ProductDiscountPriceCreateArgs>(args: SelectSubset<T, ProductDiscountPriceCreateArgs<ExtArgs>>): Prisma__ProductDiscountPriceClient<$Result.GetResult<Prisma.$ProductDiscountPricePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductDiscountPrices.
     * @param {ProductDiscountPriceCreateManyArgs} args - Arguments to create many ProductDiscountPrices.
     * @example
     * // Create many ProductDiscountPrices
     * const productDiscountPrice = await prisma.productDiscountPrice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductDiscountPriceCreateManyArgs>(args?: SelectSubset<T, ProductDiscountPriceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductDiscountPrice.
     * @param {ProductDiscountPriceDeleteArgs} args - Arguments to delete one ProductDiscountPrice.
     * @example
     * // Delete one ProductDiscountPrice
     * const ProductDiscountPrice = await prisma.productDiscountPrice.delete({
     *   where: {
     *     // ... filter to delete one ProductDiscountPrice
     *   }
     * })
     * 
     */
    delete<T extends ProductDiscountPriceDeleteArgs>(args: SelectSubset<T, ProductDiscountPriceDeleteArgs<ExtArgs>>): Prisma__ProductDiscountPriceClient<$Result.GetResult<Prisma.$ProductDiscountPricePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductDiscountPrice.
     * @param {ProductDiscountPriceUpdateArgs} args - Arguments to update one ProductDiscountPrice.
     * @example
     * // Update one ProductDiscountPrice
     * const productDiscountPrice = await prisma.productDiscountPrice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductDiscountPriceUpdateArgs>(args: SelectSubset<T, ProductDiscountPriceUpdateArgs<ExtArgs>>): Prisma__ProductDiscountPriceClient<$Result.GetResult<Prisma.$ProductDiscountPricePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductDiscountPrices.
     * @param {ProductDiscountPriceDeleteManyArgs} args - Arguments to filter ProductDiscountPrices to delete.
     * @example
     * // Delete a few ProductDiscountPrices
     * const { count } = await prisma.productDiscountPrice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDiscountPriceDeleteManyArgs>(args?: SelectSubset<T, ProductDiscountPriceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductDiscountPrices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscountPriceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductDiscountPrices
     * const productDiscountPrice = await prisma.productDiscountPrice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductDiscountPriceUpdateManyArgs>(args: SelectSubset<T, ProductDiscountPriceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductDiscountPrice.
     * @param {ProductDiscountPriceUpsertArgs} args - Arguments to update or create a ProductDiscountPrice.
     * @example
     * // Update or create a ProductDiscountPrice
     * const productDiscountPrice = await prisma.productDiscountPrice.upsert({
     *   create: {
     *     // ... data to create a ProductDiscountPrice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductDiscountPrice we want to update
     *   }
     * })
     */
    upsert<T extends ProductDiscountPriceUpsertArgs>(args: SelectSubset<T, ProductDiscountPriceUpsertArgs<ExtArgs>>): Prisma__ProductDiscountPriceClient<$Result.GetResult<Prisma.$ProductDiscountPricePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductDiscountPrices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscountPriceCountArgs} args - Arguments to filter ProductDiscountPrices to count.
     * @example
     * // Count the number of ProductDiscountPrices
     * const count = await prisma.productDiscountPrice.count({
     *   where: {
     *     // ... the filter for the ProductDiscountPrices we want to count
     *   }
     * })
    **/
    count<T extends ProductDiscountPriceCountArgs>(
      args?: Subset<T, ProductDiscountPriceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductDiscountPriceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductDiscountPrice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscountPriceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductDiscountPriceAggregateArgs>(args: Subset<T, ProductDiscountPriceAggregateArgs>): Prisma.PrismaPromise<GetProductDiscountPriceAggregateType<T>>

    /**
     * Group by ProductDiscountPrice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDiscountPriceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductDiscountPriceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductDiscountPriceGroupByArgs['orderBy'] }
        : { orderBy?: ProductDiscountPriceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductDiscountPriceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductDiscountPriceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductDiscountPrice model
   */
  readonly fields: ProductDiscountPriceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductDiscountPrice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductDiscountPriceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    discount<T extends CategoryWeightDiscountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryWeightDiscountDefaultArgs<ExtArgs>>): Prisma__CategoryWeightDiscountClient<$Result.GetResult<Prisma.$CategoryWeightDiscountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductDiscountPrice model
   */
  interface ProductDiscountPriceFieldRefs {
    readonly id: FieldRef<"ProductDiscountPrice", 'String'>
    readonly productId: FieldRef<"ProductDiscountPrice", 'String'>
    readonly discountId: FieldRef<"ProductDiscountPrice", 'String'>
    readonly discountPrice: FieldRef<"ProductDiscountPrice", 'Float'>
    readonly createdAt: FieldRef<"ProductDiscountPrice", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductDiscountPrice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductDiscountPrice findUnique
   */
  export type ProductDiscountPriceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscountPrice
     */
    select?: ProductDiscountPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscountPrice
     */
    omit?: ProductDiscountPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscountPriceInclude<ExtArgs> | null
    /**
     * Filter, which ProductDiscountPrice to fetch.
     */
    where: ProductDiscountPriceWhereUniqueInput
  }

  /**
   * ProductDiscountPrice findUniqueOrThrow
   */
  export type ProductDiscountPriceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscountPrice
     */
    select?: ProductDiscountPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscountPrice
     */
    omit?: ProductDiscountPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscountPriceInclude<ExtArgs> | null
    /**
     * Filter, which ProductDiscountPrice to fetch.
     */
    where: ProductDiscountPriceWhereUniqueInput
  }

  /**
   * ProductDiscountPrice findFirst
   */
  export type ProductDiscountPriceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscountPrice
     */
    select?: ProductDiscountPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscountPrice
     */
    omit?: ProductDiscountPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscountPriceInclude<ExtArgs> | null
    /**
     * Filter, which ProductDiscountPrice to fetch.
     */
    where?: ProductDiscountPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductDiscountPrices to fetch.
     */
    orderBy?: ProductDiscountPriceOrderByWithRelationInput | ProductDiscountPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductDiscountPrices.
     */
    cursor?: ProductDiscountPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductDiscountPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductDiscountPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductDiscountPrices.
     */
    distinct?: ProductDiscountPriceScalarFieldEnum | ProductDiscountPriceScalarFieldEnum[]
  }

  /**
   * ProductDiscountPrice findFirstOrThrow
   */
  export type ProductDiscountPriceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscountPrice
     */
    select?: ProductDiscountPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscountPrice
     */
    omit?: ProductDiscountPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscountPriceInclude<ExtArgs> | null
    /**
     * Filter, which ProductDiscountPrice to fetch.
     */
    where?: ProductDiscountPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductDiscountPrices to fetch.
     */
    orderBy?: ProductDiscountPriceOrderByWithRelationInput | ProductDiscountPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductDiscountPrices.
     */
    cursor?: ProductDiscountPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductDiscountPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductDiscountPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductDiscountPrices.
     */
    distinct?: ProductDiscountPriceScalarFieldEnum | ProductDiscountPriceScalarFieldEnum[]
  }

  /**
   * ProductDiscountPrice findMany
   */
  export type ProductDiscountPriceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscountPrice
     */
    select?: ProductDiscountPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscountPrice
     */
    omit?: ProductDiscountPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscountPriceInclude<ExtArgs> | null
    /**
     * Filter, which ProductDiscountPrices to fetch.
     */
    where?: ProductDiscountPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductDiscountPrices to fetch.
     */
    orderBy?: ProductDiscountPriceOrderByWithRelationInput | ProductDiscountPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductDiscountPrices.
     */
    cursor?: ProductDiscountPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductDiscountPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductDiscountPrices.
     */
    skip?: number
    distinct?: ProductDiscountPriceScalarFieldEnum | ProductDiscountPriceScalarFieldEnum[]
  }

  /**
   * ProductDiscountPrice create
   */
  export type ProductDiscountPriceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscountPrice
     */
    select?: ProductDiscountPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscountPrice
     */
    omit?: ProductDiscountPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscountPriceInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductDiscountPrice.
     */
    data: XOR<ProductDiscountPriceCreateInput, ProductDiscountPriceUncheckedCreateInput>
  }

  /**
   * ProductDiscountPrice createMany
   */
  export type ProductDiscountPriceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductDiscountPrices.
     */
    data: ProductDiscountPriceCreateManyInput | ProductDiscountPriceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductDiscountPrice update
   */
  export type ProductDiscountPriceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscountPrice
     */
    select?: ProductDiscountPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscountPrice
     */
    omit?: ProductDiscountPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscountPriceInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductDiscountPrice.
     */
    data: XOR<ProductDiscountPriceUpdateInput, ProductDiscountPriceUncheckedUpdateInput>
    /**
     * Choose, which ProductDiscountPrice to update.
     */
    where: ProductDiscountPriceWhereUniqueInput
  }

  /**
   * ProductDiscountPrice updateMany
   */
  export type ProductDiscountPriceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductDiscountPrices.
     */
    data: XOR<ProductDiscountPriceUpdateManyMutationInput, ProductDiscountPriceUncheckedUpdateManyInput>
    /**
     * Filter which ProductDiscountPrices to update
     */
    where?: ProductDiscountPriceWhereInput
    /**
     * Limit how many ProductDiscountPrices to update.
     */
    limit?: number
  }

  /**
   * ProductDiscountPrice upsert
   */
  export type ProductDiscountPriceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscountPrice
     */
    select?: ProductDiscountPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscountPrice
     */
    omit?: ProductDiscountPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscountPriceInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductDiscountPrice to update in case it exists.
     */
    where: ProductDiscountPriceWhereUniqueInput
    /**
     * In case the ProductDiscountPrice found by the `where` argument doesn't exist, create a new ProductDiscountPrice with this data.
     */
    create: XOR<ProductDiscountPriceCreateInput, ProductDiscountPriceUncheckedCreateInput>
    /**
     * In case the ProductDiscountPrice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductDiscountPriceUpdateInput, ProductDiscountPriceUncheckedUpdateInput>
  }

  /**
   * ProductDiscountPrice delete
   */
  export type ProductDiscountPriceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscountPrice
     */
    select?: ProductDiscountPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscountPrice
     */
    omit?: ProductDiscountPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscountPriceInclude<ExtArgs> | null
    /**
     * Filter which ProductDiscountPrice to delete.
     */
    where: ProductDiscountPriceWhereUniqueInput
  }

  /**
   * ProductDiscountPrice deleteMany
   */
  export type ProductDiscountPriceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductDiscountPrices to delete
     */
    where?: ProductDiscountPriceWhereInput
    /**
     * Limit how many ProductDiscountPrices to delete.
     */
    limit?: number
  }

  /**
   * ProductDiscountPrice without action
   */
  export type ProductDiscountPriceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiscountPrice
     */
    select?: ProductDiscountPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductDiscountPrice
     */
    omit?: ProductDiscountPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductDiscountPriceInclude<ExtArgs> | null
  }


  /**
   * Model ProductWeightDiscount
   */

  export type AggregateProductWeightDiscount = {
    _count: ProductWeightDiscountCountAggregateOutputType | null
    _avg: ProductWeightDiscountAvgAggregateOutputType | null
    _sum: ProductWeightDiscountSumAggregateOutputType | null
    _min: ProductWeightDiscountMinAggregateOutputType | null
    _max: ProductWeightDiscountMaxAggregateOutputType | null
  }

  export type ProductWeightDiscountAvgAggregateOutputType = {
    minWeight: number | null
    price: number | null
  }

  export type ProductWeightDiscountSumAggregateOutputType = {
    minWeight: number | null
    price: number | null
  }

  export type ProductWeightDiscountMinAggregateOutputType = {
    id: string | null
    productId: string | null
    minWeight: number | null
    price: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductWeightDiscountMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    minWeight: number | null
    price: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductWeightDiscountCountAggregateOutputType = {
    id: number
    productId: number
    minWeight: number
    price: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductWeightDiscountAvgAggregateInputType = {
    minWeight?: true
    price?: true
  }

  export type ProductWeightDiscountSumAggregateInputType = {
    minWeight?: true
    price?: true
  }

  export type ProductWeightDiscountMinAggregateInputType = {
    id?: true
    productId?: true
    minWeight?: true
    price?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductWeightDiscountMaxAggregateInputType = {
    id?: true
    productId?: true
    minWeight?: true
    price?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductWeightDiscountCountAggregateInputType = {
    id?: true
    productId?: true
    minWeight?: true
    price?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductWeightDiscountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductWeightDiscount to aggregate.
     */
    where?: ProductWeightDiscountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductWeightDiscounts to fetch.
     */
    orderBy?: ProductWeightDiscountOrderByWithRelationInput | ProductWeightDiscountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWeightDiscountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductWeightDiscounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductWeightDiscounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductWeightDiscounts
    **/
    _count?: true | ProductWeightDiscountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductWeightDiscountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductWeightDiscountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductWeightDiscountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductWeightDiscountMaxAggregateInputType
  }

  export type GetProductWeightDiscountAggregateType<T extends ProductWeightDiscountAggregateArgs> = {
        [P in keyof T & keyof AggregateProductWeightDiscount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductWeightDiscount[P]>
      : GetScalarType<T[P], AggregateProductWeightDiscount[P]>
  }




  export type ProductWeightDiscountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWeightDiscountWhereInput
    orderBy?: ProductWeightDiscountOrderByWithAggregationInput | ProductWeightDiscountOrderByWithAggregationInput[]
    by: ProductWeightDiscountScalarFieldEnum[] | ProductWeightDiscountScalarFieldEnum
    having?: ProductWeightDiscountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductWeightDiscountCountAggregateInputType | true
    _avg?: ProductWeightDiscountAvgAggregateInputType
    _sum?: ProductWeightDiscountSumAggregateInputType
    _min?: ProductWeightDiscountMinAggregateInputType
    _max?: ProductWeightDiscountMaxAggregateInputType
  }

  export type ProductWeightDiscountGroupByOutputType = {
    id: string
    productId: string
    minWeight: number
    price: number
    createdAt: Date
    updatedAt: Date
    _count: ProductWeightDiscountCountAggregateOutputType | null
    _avg: ProductWeightDiscountAvgAggregateOutputType | null
    _sum: ProductWeightDiscountSumAggregateOutputType | null
    _min: ProductWeightDiscountMinAggregateOutputType | null
    _max: ProductWeightDiscountMaxAggregateOutputType | null
  }

  type GetProductWeightDiscountGroupByPayload<T extends ProductWeightDiscountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductWeightDiscountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductWeightDiscountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductWeightDiscountGroupByOutputType[P]>
            : GetScalarType<T[P], ProductWeightDiscountGroupByOutputType[P]>
        }
      >
    >


  export type ProductWeightDiscountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    minWeight?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productWeightDiscount"]>



  export type ProductWeightDiscountSelectScalar = {
    id?: boolean
    productId?: boolean
    minWeight?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductWeightDiscountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "minWeight" | "price" | "createdAt" | "updatedAt", ExtArgs["result"]["productWeightDiscount"]>
  export type ProductWeightDiscountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductWeightDiscountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductWeightDiscount"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      minWeight: number
      price: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productWeightDiscount"]>
    composites: {}
  }

  type ProductWeightDiscountGetPayload<S extends boolean | null | undefined | ProductWeightDiscountDefaultArgs> = $Result.GetResult<Prisma.$ProductWeightDiscountPayload, S>

  type ProductWeightDiscountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductWeightDiscountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductWeightDiscountCountAggregateInputType | true
    }

  export interface ProductWeightDiscountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductWeightDiscount'], meta: { name: 'ProductWeightDiscount' } }
    /**
     * Find zero or one ProductWeightDiscount that matches the filter.
     * @param {ProductWeightDiscountFindUniqueArgs} args - Arguments to find a ProductWeightDiscount
     * @example
     * // Get one ProductWeightDiscount
     * const productWeightDiscount = await prisma.productWeightDiscount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductWeightDiscountFindUniqueArgs>(args: SelectSubset<T, ProductWeightDiscountFindUniqueArgs<ExtArgs>>): Prisma__ProductWeightDiscountClient<$Result.GetResult<Prisma.$ProductWeightDiscountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductWeightDiscount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductWeightDiscountFindUniqueOrThrowArgs} args - Arguments to find a ProductWeightDiscount
     * @example
     * // Get one ProductWeightDiscount
     * const productWeightDiscount = await prisma.productWeightDiscount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductWeightDiscountFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductWeightDiscountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductWeightDiscountClient<$Result.GetResult<Prisma.$ProductWeightDiscountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductWeightDiscount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductWeightDiscountFindFirstArgs} args - Arguments to find a ProductWeightDiscount
     * @example
     * // Get one ProductWeightDiscount
     * const productWeightDiscount = await prisma.productWeightDiscount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductWeightDiscountFindFirstArgs>(args?: SelectSubset<T, ProductWeightDiscountFindFirstArgs<ExtArgs>>): Prisma__ProductWeightDiscountClient<$Result.GetResult<Prisma.$ProductWeightDiscountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductWeightDiscount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductWeightDiscountFindFirstOrThrowArgs} args - Arguments to find a ProductWeightDiscount
     * @example
     * // Get one ProductWeightDiscount
     * const productWeightDiscount = await prisma.productWeightDiscount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductWeightDiscountFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductWeightDiscountFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductWeightDiscountClient<$Result.GetResult<Prisma.$ProductWeightDiscountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductWeightDiscounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductWeightDiscountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductWeightDiscounts
     * const productWeightDiscounts = await prisma.productWeightDiscount.findMany()
     * 
     * // Get first 10 ProductWeightDiscounts
     * const productWeightDiscounts = await prisma.productWeightDiscount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWeightDiscountWithIdOnly = await prisma.productWeightDiscount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductWeightDiscountFindManyArgs>(args?: SelectSubset<T, ProductWeightDiscountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductWeightDiscountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductWeightDiscount.
     * @param {ProductWeightDiscountCreateArgs} args - Arguments to create a ProductWeightDiscount.
     * @example
     * // Create one ProductWeightDiscount
     * const ProductWeightDiscount = await prisma.productWeightDiscount.create({
     *   data: {
     *     // ... data to create a ProductWeightDiscount
     *   }
     * })
     * 
     */
    create<T extends ProductWeightDiscountCreateArgs>(args: SelectSubset<T, ProductWeightDiscountCreateArgs<ExtArgs>>): Prisma__ProductWeightDiscountClient<$Result.GetResult<Prisma.$ProductWeightDiscountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductWeightDiscounts.
     * @param {ProductWeightDiscountCreateManyArgs} args - Arguments to create many ProductWeightDiscounts.
     * @example
     * // Create many ProductWeightDiscounts
     * const productWeightDiscount = await prisma.productWeightDiscount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductWeightDiscountCreateManyArgs>(args?: SelectSubset<T, ProductWeightDiscountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductWeightDiscount.
     * @param {ProductWeightDiscountDeleteArgs} args - Arguments to delete one ProductWeightDiscount.
     * @example
     * // Delete one ProductWeightDiscount
     * const ProductWeightDiscount = await prisma.productWeightDiscount.delete({
     *   where: {
     *     // ... filter to delete one ProductWeightDiscount
     *   }
     * })
     * 
     */
    delete<T extends ProductWeightDiscountDeleteArgs>(args: SelectSubset<T, ProductWeightDiscountDeleteArgs<ExtArgs>>): Prisma__ProductWeightDiscountClient<$Result.GetResult<Prisma.$ProductWeightDiscountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductWeightDiscount.
     * @param {ProductWeightDiscountUpdateArgs} args - Arguments to update one ProductWeightDiscount.
     * @example
     * // Update one ProductWeightDiscount
     * const productWeightDiscount = await prisma.productWeightDiscount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductWeightDiscountUpdateArgs>(args: SelectSubset<T, ProductWeightDiscountUpdateArgs<ExtArgs>>): Prisma__ProductWeightDiscountClient<$Result.GetResult<Prisma.$ProductWeightDiscountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductWeightDiscounts.
     * @param {ProductWeightDiscountDeleteManyArgs} args - Arguments to filter ProductWeightDiscounts to delete.
     * @example
     * // Delete a few ProductWeightDiscounts
     * const { count } = await prisma.productWeightDiscount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductWeightDiscountDeleteManyArgs>(args?: SelectSubset<T, ProductWeightDiscountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductWeightDiscounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductWeightDiscountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductWeightDiscounts
     * const productWeightDiscount = await prisma.productWeightDiscount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductWeightDiscountUpdateManyArgs>(args: SelectSubset<T, ProductWeightDiscountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductWeightDiscount.
     * @param {ProductWeightDiscountUpsertArgs} args - Arguments to update or create a ProductWeightDiscount.
     * @example
     * // Update or create a ProductWeightDiscount
     * const productWeightDiscount = await prisma.productWeightDiscount.upsert({
     *   create: {
     *     // ... data to create a ProductWeightDiscount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductWeightDiscount we want to update
     *   }
     * })
     */
    upsert<T extends ProductWeightDiscountUpsertArgs>(args: SelectSubset<T, ProductWeightDiscountUpsertArgs<ExtArgs>>): Prisma__ProductWeightDiscountClient<$Result.GetResult<Prisma.$ProductWeightDiscountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductWeightDiscounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductWeightDiscountCountArgs} args - Arguments to filter ProductWeightDiscounts to count.
     * @example
     * // Count the number of ProductWeightDiscounts
     * const count = await prisma.productWeightDiscount.count({
     *   where: {
     *     // ... the filter for the ProductWeightDiscounts we want to count
     *   }
     * })
    **/
    count<T extends ProductWeightDiscountCountArgs>(
      args?: Subset<T, ProductWeightDiscountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductWeightDiscountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductWeightDiscount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductWeightDiscountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductWeightDiscountAggregateArgs>(args: Subset<T, ProductWeightDiscountAggregateArgs>): Prisma.PrismaPromise<GetProductWeightDiscountAggregateType<T>>

    /**
     * Group by ProductWeightDiscount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductWeightDiscountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductWeightDiscountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductWeightDiscountGroupByArgs['orderBy'] }
        : { orderBy?: ProductWeightDiscountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductWeightDiscountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductWeightDiscountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductWeightDiscount model
   */
  readonly fields: ProductWeightDiscountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductWeightDiscount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductWeightDiscountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductWeightDiscount model
   */
  interface ProductWeightDiscountFieldRefs {
    readonly id: FieldRef<"ProductWeightDiscount", 'String'>
    readonly productId: FieldRef<"ProductWeightDiscount", 'String'>
    readonly minWeight: FieldRef<"ProductWeightDiscount", 'Float'>
    readonly price: FieldRef<"ProductWeightDiscount", 'Float'>
    readonly createdAt: FieldRef<"ProductWeightDiscount", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductWeightDiscount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductWeightDiscount findUnique
   */
  export type ProductWeightDiscountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductWeightDiscount
     */
    select?: ProductWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductWeightDiscount
     */
    omit?: ProductWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductWeightDiscountInclude<ExtArgs> | null
    /**
     * Filter, which ProductWeightDiscount to fetch.
     */
    where: ProductWeightDiscountWhereUniqueInput
  }

  /**
   * ProductWeightDiscount findUniqueOrThrow
   */
  export type ProductWeightDiscountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductWeightDiscount
     */
    select?: ProductWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductWeightDiscount
     */
    omit?: ProductWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductWeightDiscountInclude<ExtArgs> | null
    /**
     * Filter, which ProductWeightDiscount to fetch.
     */
    where: ProductWeightDiscountWhereUniqueInput
  }

  /**
   * ProductWeightDiscount findFirst
   */
  export type ProductWeightDiscountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductWeightDiscount
     */
    select?: ProductWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductWeightDiscount
     */
    omit?: ProductWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductWeightDiscountInclude<ExtArgs> | null
    /**
     * Filter, which ProductWeightDiscount to fetch.
     */
    where?: ProductWeightDiscountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductWeightDiscounts to fetch.
     */
    orderBy?: ProductWeightDiscountOrderByWithRelationInput | ProductWeightDiscountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductWeightDiscounts.
     */
    cursor?: ProductWeightDiscountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductWeightDiscounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductWeightDiscounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductWeightDiscounts.
     */
    distinct?: ProductWeightDiscountScalarFieldEnum | ProductWeightDiscountScalarFieldEnum[]
  }

  /**
   * ProductWeightDiscount findFirstOrThrow
   */
  export type ProductWeightDiscountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductWeightDiscount
     */
    select?: ProductWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductWeightDiscount
     */
    omit?: ProductWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductWeightDiscountInclude<ExtArgs> | null
    /**
     * Filter, which ProductWeightDiscount to fetch.
     */
    where?: ProductWeightDiscountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductWeightDiscounts to fetch.
     */
    orderBy?: ProductWeightDiscountOrderByWithRelationInput | ProductWeightDiscountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductWeightDiscounts.
     */
    cursor?: ProductWeightDiscountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductWeightDiscounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductWeightDiscounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductWeightDiscounts.
     */
    distinct?: ProductWeightDiscountScalarFieldEnum | ProductWeightDiscountScalarFieldEnum[]
  }

  /**
   * ProductWeightDiscount findMany
   */
  export type ProductWeightDiscountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductWeightDiscount
     */
    select?: ProductWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductWeightDiscount
     */
    omit?: ProductWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductWeightDiscountInclude<ExtArgs> | null
    /**
     * Filter, which ProductWeightDiscounts to fetch.
     */
    where?: ProductWeightDiscountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductWeightDiscounts to fetch.
     */
    orderBy?: ProductWeightDiscountOrderByWithRelationInput | ProductWeightDiscountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductWeightDiscounts.
     */
    cursor?: ProductWeightDiscountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductWeightDiscounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductWeightDiscounts.
     */
    skip?: number
    distinct?: ProductWeightDiscountScalarFieldEnum | ProductWeightDiscountScalarFieldEnum[]
  }

  /**
   * ProductWeightDiscount create
   */
  export type ProductWeightDiscountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductWeightDiscount
     */
    select?: ProductWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductWeightDiscount
     */
    omit?: ProductWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductWeightDiscountInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductWeightDiscount.
     */
    data: XOR<ProductWeightDiscountCreateInput, ProductWeightDiscountUncheckedCreateInput>
  }

  /**
   * ProductWeightDiscount createMany
   */
  export type ProductWeightDiscountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductWeightDiscounts.
     */
    data: ProductWeightDiscountCreateManyInput | ProductWeightDiscountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductWeightDiscount update
   */
  export type ProductWeightDiscountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductWeightDiscount
     */
    select?: ProductWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductWeightDiscount
     */
    omit?: ProductWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductWeightDiscountInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductWeightDiscount.
     */
    data: XOR<ProductWeightDiscountUpdateInput, ProductWeightDiscountUncheckedUpdateInput>
    /**
     * Choose, which ProductWeightDiscount to update.
     */
    where: ProductWeightDiscountWhereUniqueInput
  }

  /**
   * ProductWeightDiscount updateMany
   */
  export type ProductWeightDiscountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductWeightDiscounts.
     */
    data: XOR<ProductWeightDiscountUpdateManyMutationInput, ProductWeightDiscountUncheckedUpdateManyInput>
    /**
     * Filter which ProductWeightDiscounts to update
     */
    where?: ProductWeightDiscountWhereInput
    /**
     * Limit how many ProductWeightDiscounts to update.
     */
    limit?: number
  }

  /**
   * ProductWeightDiscount upsert
   */
  export type ProductWeightDiscountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductWeightDiscount
     */
    select?: ProductWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductWeightDiscount
     */
    omit?: ProductWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductWeightDiscountInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductWeightDiscount to update in case it exists.
     */
    where: ProductWeightDiscountWhereUniqueInput
    /**
     * In case the ProductWeightDiscount found by the `where` argument doesn't exist, create a new ProductWeightDiscount with this data.
     */
    create: XOR<ProductWeightDiscountCreateInput, ProductWeightDiscountUncheckedCreateInput>
    /**
     * In case the ProductWeightDiscount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductWeightDiscountUpdateInput, ProductWeightDiscountUncheckedUpdateInput>
  }

  /**
   * ProductWeightDiscount delete
   */
  export type ProductWeightDiscountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductWeightDiscount
     */
    select?: ProductWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductWeightDiscount
     */
    omit?: ProductWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductWeightDiscountInclude<ExtArgs> | null
    /**
     * Filter which ProductWeightDiscount to delete.
     */
    where: ProductWeightDiscountWhereUniqueInput
  }

  /**
   * ProductWeightDiscount deleteMany
   */
  export type ProductWeightDiscountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductWeightDiscounts to delete
     */
    where?: ProductWeightDiscountWhereInput
    /**
     * Limit how many ProductWeightDiscounts to delete.
     */
    limit?: number
  }

  /**
   * ProductWeightDiscount without action
   */
  export type ProductWeightDiscountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductWeightDiscount
     */
    select?: ProductWeightDiscountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductWeightDiscount
     */
    omit?: ProductWeightDiscountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductWeightDiscountInclude<ExtArgs> | null
  }


  /**
   * Model ProductNutrition
   */

  export type AggregateProductNutrition = {
    _count: ProductNutritionCountAggregateOutputType | null
    _avg: ProductNutritionAvgAggregateOutputType | null
    _sum: ProductNutritionSumAggregateOutputType | null
    _min: ProductNutritionMinAggregateOutputType | null
    _max: ProductNutritionMaxAggregateOutputType | null
  }

  export type ProductNutritionAvgAggregateOutputType = {
    grams: number | null
  }

  export type ProductNutritionSumAggregateOutputType = {
    grams: number | null
  }

  export type ProductNutritionMinAggregateOutputType = {
    id: string | null
    productId: string | null
    name: string | null
    grams: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductNutritionMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    name: string | null
    grams: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductNutritionCountAggregateOutputType = {
    id: number
    productId: number
    name: number
    grams: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductNutritionAvgAggregateInputType = {
    grams?: true
  }

  export type ProductNutritionSumAggregateInputType = {
    grams?: true
  }

  export type ProductNutritionMinAggregateInputType = {
    id?: true
    productId?: true
    name?: true
    grams?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductNutritionMaxAggregateInputType = {
    id?: true
    productId?: true
    name?: true
    grams?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductNutritionCountAggregateInputType = {
    id?: true
    productId?: true
    name?: true
    grams?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductNutritionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductNutrition to aggregate.
     */
    where?: ProductNutritionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductNutritions to fetch.
     */
    orderBy?: ProductNutritionOrderByWithRelationInput | ProductNutritionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductNutritionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductNutritions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductNutritions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductNutritions
    **/
    _count?: true | ProductNutritionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductNutritionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductNutritionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductNutritionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductNutritionMaxAggregateInputType
  }

  export type GetProductNutritionAggregateType<T extends ProductNutritionAggregateArgs> = {
        [P in keyof T & keyof AggregateProductNutrition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductNutrition[P]>
      : GetScalarType<T[P], AggregateProductNutrition[P]>
  }




  export type ProductNutritionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductNutritionWhereInput
    orderBy?: ProductNutritionOrderByWithAggregationInput | ProductNutritionOrderByWithAggregationInput[]
    by: ProductNutritionScalarFieldEnum[] | ProductNutritionScalarFieldEnum
    having?: ProductNutritionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductNutritionCountAggregateInputType | true
    _avg?: ProductNutritionAvgAggregateInputType
    _sum?: ProductNutritionSumAggregateInputType
    _min?: ProductNutritionMinAggregateInputType
    _max?: ProductNutritionMaxAggregateInputType
  }

  export type ProductNutritionGroupByOutputType = {
    id: string
    productId: string
    name: string
    grams: number
    createdAt: Date
    updatedAt: Date
    _count: ProductNutritionCountAggregateOutputType | null
    _avg: ProductNutritionAvgAggregateOutputType | null
    _sum: ProductNutritionSumAggregateOutputType | null
    _min: ProductNutritionMinAggregateOutputType | null
    _max: ProductNutritionMaxAggregateOutputType | null
  }

  type GetProductNutritionGroupByPayload<T extends ProductNutritionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductNutritionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductNutritionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductNutritionGroupByOutputType[P]>
            : GetScalarType<T[P], ProductNutritionGroupByOutputType[P]>
        }
      >
    >


  export type ProductNutritionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    name?: boolean
    grams?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productNutrition"]>



  export type ProductNutritionSelectScalar = {
    id?: boolean
    productId?: boolean
    name?: boolean
    grams?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductNutritionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "name" | "grams" | "createdAt" | "updatedAt", ExtArgs["result"]["productNutrition"]>
  export type ProductNutritionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ProductNutritionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductNutrition"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      name: string
      grams: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productNutrition"]>
    composites: {}
  }

  type ProductNutritionGetPayload<S extends boolean | null | undefined | ProductNutritionDefaultArgs> = $Result.GetResult<Prisma.$ProductNutritionPayload, S>

  type ProductNutritionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductNutritionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductNutritionCountAggregateInputType | true
    }

  export interface ProductNutritionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductNutrition'], meta: { name: 'ProductNutrition' } }
    /**
     * Find zero or one ProductNutrition that matches the filter.
     * @param {ProductNutritionFindUniqueArgs} args - Arguments to find a ProductNutrition
     * @example
     * // Get one ProductNutrition
     * const productNutrition = await prisma.productNutrition.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductNutritionFindUniqueArgs>(args: SelectSubset<T, ProductNutritionFindUniqueArgs<ExtArgs>>): Prisma__ProductNutritionClient<$Result.GetResult<Prisma.$ProductNutritionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductNutrition that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductNutritionFindUniqueOrThrowArgs} args - Arguments to find a ProductNutrition
     * @example
     * // Get one ProductNutrition
     * const productNutrition = await prisma.productNutrition.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductNutritionFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductNutritionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductNutritionClient<$Result.GetResult<Prisma.$ProductNutritionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductNutrition that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductNutritionFindFirstArgs} args - Arguments to find a ProductNutrition
     * @example
     * // Get one ProductNutrition
     * const productNutrition = await prisma.productNutrition.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductNutritionFindFirstArgs>(args?: SelectSubset<T, ProductNutritionFindFirstArgs<ExtArgs>>): Prisma__ProductNutritionClient<$Result.GetResult<Prisma.$ProductNutritionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductNutrition that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductNutritionFindFirstOrThrowArgs} args - Arguments to find a ProductNutrition
     * @example
     * // Get one ProductNutrition
     * const productNutrition = await prisma.productNutrition.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductNutritionFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductNutritionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductNutritionClient<$Result.GetResult<Prisma.$ProductNutritionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductNutritions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductNutritionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductNutritions
     * const productNutritions = await prisma.productNutrition.findMany()
     * 
     * // Get first 10 ProductNutritions
     * const productNutritions = await prisma.productNutrition.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productNutritionWithIdOnly = await prisma.productNutrition.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductNutritionFindManyArgs>(args?: SelectSubset<T, ProductNutritionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductNutritionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductNutrition.
     * @param {ProductNutritionCreateArgs} args - Arguments to create a ProductNutrition.
     * @example
     * // Create one ProductNutrition
     * const ProductNutrition = await prisma.productNutrition.create({
     *   data: {
     *     // ... data to create a ProductNutrition
     *   }
     * })
     * 
     */
    create<T extends ProductNutritionCreateArgs>(args: SelectSubset<T, ProductNutritionCreateArgs<ExtArgs>>): Prisma__ProductNutritionClient<$Result.GetResult<Prisma.$ProductNutritionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductNutritions.
     * @param {ProductNutritionCreateManyArgs} args - Arguments to create many ProductNutritions.
     * @example
     * // Create many ProductNutritions
     * const productNutrition = await prisma.productNutrition.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductNutritionCreateManyArgs>(args?: SelectSubset<T, ProductNutritionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProductNutrition.
     * @param {ProductNutritionDeleteArgs} args - Arguments to delete one ProductNutrition.
     * @example
     * // Delete one ProductNutrition
     * const ProductNutrition = await prisma.productNutrition.delete({
     *   where: {
     *     // ... filter to delete one ProductNutrition
     *   }
     * })
     * 
     */
    delete<T extends ProductNutritionDeleteArgs>(args: SelectSubset<T, ProductNutritionDeleteArgs<ExtArgs>>): Prisma__ProductNutritionClient<$Result.GetResult<Prisma.$ProductNutritionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductNutrition.
     * @param {ProductNutritionUpdateArgs} args - Arguments to update one ProductNutrition.
     * @example
     * // Update one ProductNutrition
     * const productNutrition = await prisma.productNutrition.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductNutritionUpdateArgs>(args: SelectSubset<T, ProductNutritionUpdateArgs<ExtArgs>>): Prisma__ProductNutritionClient<$Result.GetResult<Prisma.$ProductNutritionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductNutritions.
     * @param {ProductNutritionDeleteManyArgs} args - Arguments to filter ProductNutritions to delete.
     * @example
     * // Delete a few ProductNutritions
     * const { count } = await prisma.productNutrition.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductNutritionDeleteManyArgs>(args?: SelectSubset<T, ProductNutritionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductNutritions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductNutritionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductNutritions
     * const productNutrition = await prisma.productNutrition.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductNutritionUpdateManyArgs>(args: SelectSubset<T, ProductNutritionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductNutrition.
     * @param {ProductNutritionUpsertArgs} args - Arguments to update or create a ProductNutrition.
     * @example
     * // Update or create a ProductNutrition
     * const productNutrition = await prisma.productNutrition.upsert({
     *   create: {
     *     // ... data to create a ProductNutrition
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductNutrition we want to update
     *   }
     * })
     */
    upsert<T extends ProductNutritionUpsertArgs>(args: SelectSubset<T, ProductNutritionUpsertArgs<ExtArgs>>): Prisma__ProductNutritionClient<$Result.GetResult<Prisma.$ProductNutritionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductNutritions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductNutritionCountArgs} args - Arguments to filter ProductNutritions to count.
     * @example
     * // Count the number of ProductNutritions
     * const count = await prisma.productNutrition.count({
     *   where: {
     *     // ... the filter for the ProductNutritions we want to count
     *   }
     * })
    **/
    count<T extends ProductNutritionCountArgs>(
      args?: Subset<T, ProductNutritionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductNutritionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductNutrition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductNutritionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductNutritionAggregateArgs>(args: Subset<T, ProductNutritionAggregateArgs>): Prisma.PrismaPromise<GetProductNutritionAggregateType<T>>

    /**
     * Group by ProductNutrition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductNutritionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductNutritionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductNutritionGroupByArgs['orderBy'] }
        : { orderBy?: ProductNutritionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductNutritionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductNutritionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductNutrition model
   */
  readonly fields: ProductNutritionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductNutrition.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductNutritionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductNutrition model
   */
  interface ProductNutritionFieldRefs {
    readonly id: FieldRef<"ProductNutrition", 'String'>
    readonly productId: FieldRef<"ProductNutrition", 'String'>
    readonly name: FieldRef<"ProductNutrition", 'String'>
    readonly grams: FieldRef<"ProductNutrition", 'Float'>
    readonly createdAt: FieldRef<"ProductNutrition", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductNutrition", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductNutrition findUnique
   */
  export type ProductNutritionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNutrition
     */
    select?: ProductNutritionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductNutrition
     */
    omit?: ProductNutritionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductNutritionInclude<ExtArgs> | null
    /**
     * Filter, which ProductNutrition to fetch.
     */
    where: ProductNutritionWhereUniqueInput
  }

  /**
   * ProductNutrition findUniqueOrThrow
   */
  export type ProductNutritionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNutrition
     */
    select?: ProductNutritionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductNutrition
     */
    omit?: ProductNutritionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductNutritionInclude<ExtArgs> | null
    /**
     * Filter, which ProductNutrition to fetch.
     */
    where: ProductNutritionWhereUniqueInput
  }

  /**
   * ProductNutrition findFirst
   */
  export type ProductNutritionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNutrition
     */
    select?: ProductNutritionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductNutrition
     */
    omit?: ProductNutritionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductNutritionInclude<ExtArgs> | null
    /**
     * Filter, which ProductNutrition to fetch.
     */
    where?: ProductNutritionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductNutritions to fetch.
     */
    orderBy?: ProductNutritionOrderByWithRelationInput | ProductNutritionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductNutritions.
     */
    cursor?: ProductNutritionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductNutritions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductNutritions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductNutritions.
     */
    distinct?: ProductNutritionScalarFieldEnum | ProductNutritionScalarFieldEnum[]
  }

  /**
   * ProductNutrition findFirstOrThrow
   */
  export type ProductNutritionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNutrition
     */
    select?: ProductNutritionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductNutrition
     */
    omit?: ProductNutritionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductNutritionInclude<ExtArgs> | null
    /**
     * Filter, which ProductNutrition to fetch.
     */
    where?: ProductNutritionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductNutritions to fetch.
     */
    orderBy?: ProductNutritionOrderByWithRelationInput | ProductNutritionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductNutritions.
     */
    cursor?: ProductNutritionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductNutritions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductNutritions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductNutritions.
     */
    distinct?: ProductNutritionScalarFieldEnum | ProductNutritionScalarFieldEnum[]
  }

  /**
   * ProductNutrition findMany
   */
  export type ProductNutritionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNutrition
     */
    select?: ProductNutritionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductNutrition
     */
    omit?: ProductNutritionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductNutritionInclude<ExtArgs> | null
    /**
     * Filter, which ProductNutritions to fetch.
     */
    where?: ProductNutritionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductNutritions to fetch.
     */
    orderBy?: ProductNutritionOrderByWithRelationInput | ProductNutritionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductNutritions.
     */
    cursor?: ProductNutritionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductNutritions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductNutritions.
     */
    skip?: number
    distinct?: ProductNutritionScalarFieldEnum | ProductNutritionScalarFieldEnum[]
  }

  /**
   * ProductNutrition create
   */
  export type ProductNutritionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNutrition
     */
    select?: ProductNutritionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductNutrition
     */
    omit?: ProductNutritionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductNutritionInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductNutrition.
     */
    data: XOR<ProductNutritionCreateInput, ProductNutritionUncheckedCreateInput>
  }

  /**
   * ProductNutrition createMany
   */
  export type ProductNutritionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductNutritions.
     */
    data: ProductNutritionCreateManyInput | ProductNutritionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductNutrition update
   */
  export type ProductNutritionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNutrition
     */
    select?: ProductNutritionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductNutrition
     */
    omit?: ProductNutritionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductNutritionInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductNutrition.
     */
    data: XOR<ProductNutritionUpdateInput, ProductNutritionUncheckedUpdateInput>
    /**
     * Choose, which ProductNutrition to update.
     */
    where: ProductNutritionWhereUniqueInput
  }

  /**
   * ProductNutrition updateMany
   */
  export type ProductNutritionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductNutritions.
     */
    data: XOR<ProductNutritionUpdateManyMutationInput, ProductNutritionUncheckedUpdateManyInput>
    /**
     * Filter which ProductNutritions to update
     */
    where?: ProductNutritionWhereInput
    /**
     * Limit how many ProductNutritions to update.
     */
    limit?: number
  }

  /**
   * ProductNutrition upsert
   */
  export type ProductNutritionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNutrition
     */
    select?: ProductNutritionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductNutrition
     */
    omit?: ProductNutritionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductNutritionInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductNutrition to update in case it exists.
     */
    where: ProductNutritionWhereUniqueInput
    /**
     * In case the ProductNutrition found by the `where` argument doesn't exist, create a new ProductNutrition with this data.
     */
    create: XOR<ProductNutritionCreateInput, ProductNutritionUncheckedCreateInput>
    /**
     * In case the ProductNutrition was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductNutritionUpdateInput, ProductNutritionUncheckedUpdateInput>
  }

  /**
   * ProductNutrition delete
   */
  export type ProductNutritionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNutrition
     */
    select?: ProductNutritionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductNutrition
     */
    omit?: ProductNutritionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductNutritionInclude<ExtArgs> | null
    /**
     * Filter which ProductNutrition to delete.
     */
    where: ProductNutritionWhereUniqueInput
  }

  /**
   * ProductNutrition deleteMany
   */
  export type ProductNutritionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductNutritions to delete
     */
    where?: ProductNutritionWhereInput
    /**
     * Limit how many ProductNutritions to delete.
     */
    limit?: number
  }

  /**
   * ProductNutrition without action
   */
  export type ProductNutritionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductNutrition
     */
    select?: ProductNutritionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductNutrition
     */
    omit?: ProductNutritionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductNutritionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    description: 'description',
    price: 'price',
    regularPrice: 'regularPrice',
    length: 'length',
    breadth: 'breadth',
    height: 'height',
    weight: 'weight',
    packingWeight: 'packingWeight',
    tax: 'tax',
    hsnsac: 'hsnsac',
    mainImage: 'mainImage',
    images: 'images',
    inStock: 'inStock',
    approved: 'approved',
    webVisible: 'webVisible',
    stockCount: 'stockCount',
    vegetable: 'vegetable',
    veg: 'veg',
    frozen: 'frozen',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy',
    approvedAt: 'approvedAt',
    approvedBy: 'approvedBy',
    categoryId: 'categoryId'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const CategoryWeightDiscountScalarFieldEnum: {
    id: 'id',
    minWeight: 'minWeight',
    categoryId: 'categoryId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryWeightDiscountScalarFieldEnum = (typeof CategoryWeightDiscountScalarFieldEnum)[keyof typeof CategoryWeightDiscountScalarFieldEnum]


  export const ProductDiscountPriceScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    discountId: 'discountId',
    discountPrice: 'discountPrice',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductDiscountPriceScalarFieldEnum = (typeof ProductDiscountPriceScalarFieldEnum)[keyof typeof ProductDiscountPriceScalarFieldEnum]


  export const ProductWeightDiscountScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    minWeight: 'minWeight',
    price: 'price',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductWeightDiscountScalarFieldEnum = (typeof ProductWeightDiscountScalarFieldEnum)[keyof typeof ProductWeightDiscountScalarFieldEnum]


  export const ProductNutritionScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    name: 'name',
    grams: 'grams',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductNutritionScalarFieldEnum = (typeof ProductNutritionScalarFieldEnum)[keyof typeof ProductNutritionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const CategoryOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type CategoryOrderByRelevanceFieldEnum = (typeof CategoryOrderByRelevanceFieldEnum)[keyof typeof CategoryOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const ProductOrderByRelevanceFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    description: 'description',
    hsnsac: 'hsnsac',
    mainImage: 'mainImage',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    approvedBy: 'approvedBy',
    categoryId: 'categoryId'
  };

  export type ProductOrderByRelevanceFieldEnum = (typeof ProductOrderByRelevanceFieldEnum)[keyof typeof ProductOrderByRelevanceFieldEnum]


  export const CategoryWeightDiscountOrderByRelevanceFieldEnum: {
    id: 'id',
    categoryId: 'categoryId'
  };

  export type CategoryWeightDiscountOrderByRelevanceFieldEnum = (typeof CategoryWeightDiscountOrderByRelevanceFieldEnum)[keyof typeof CategoryWeightDiscountOrderByRelevanceFieldEnum]


  export const ProductDiscountPriceOrderByRelevanceFieldEnum: {
    id: 'id',
    productId: 'productId',
    discountId: 'discountId'
  };

  export type ProductDiscountPriceOrderByRelevanceFieldEnum = (typeof ProductDiscountPriceOrderByRelevanceFieldEnum)[keyof typeof ProductDiscountPriceOrderByRelevanceFieldEnum]


  export const ProductWeightDiscountOrderByRelevanceFieldEnum: {
    id: 'id',
    productId: 'productId'
  };

  export type ProductWeightDiscountOrderByRelevanceFieldEnum = (typeof ProductWeightDiscountOrderByRelevanceFieldEnum)[keyof typeof ProductWeightDiscountOrderByRelevanceFieldEnum]


  export const ProductNutritionOrderByRelevanceFieldEnum: {
    id: 'id',
    productId: 'productId',
    name: 'name'
  };

  export type ProductNutritionOrderByRelevanceFieldEnum = (typeof ProductNutritionOrderByRelevanceFieldEnum)[keyof typeof ProductNutritionOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    products?: ProductListRelationFilter
    weightDiscounts?: CategoryWeightDiscountListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    products?: ProductOrderByRelationAggregateInput
    weightDiscounts?: CategoryWeightDiscountOrderByRelationAggregateInput
    _relevance?: CategoryOrderByRelevanceInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    products?: ProductListRelationFilter
    weightDiscounts?: CategoryWeightDiscountListRelationFilter
  }, "id">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    code?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: FloatFilter<"Product"> | number
    regularPrice?: FloatNullableFilter<"Product"> | number | null
    length?: FloatNullableFilter<"Product"> | number | null
    breadth?: FloatNullableFilter<"Product"> | number | null
    height?: FloatNullableFilter<"Product"> | number | null
    weight?: FloatNullableFilter<"Product"> | number | null
    packingWeight?: FloatNullableFilter<"Product"> | number | null
    tax?: IntFilter<"Product"> | number
    hsnsac?: StringNullableFilter<"Product"> | string | null
    mainImage?: StringNullableFilter<"Product"> | string | null
    images?: JsonNullableFilter<"Product">
    inStock?: BoolFilter<"Product"> | boolean
    approved?: BoolFilter<"Product"> | boolean
    webVisible?: BoolFilter<"Product"> | boolean
    stockCount?: IntNullableFilter<"Product"> | number | null
    vegetable?: BoolFilter<"Product"> | boolean
    veg?: BoolFilter<"Product"> | boolean
    frozen?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    createdBy?: StringFilter<"Product"> | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    updatedBy?: StringFilter<"Product"> | string
    approvedAt?: DateTimeNullableFilter<"Product"> | Date | string | null
    approvedBy?: StringNullableFilter<"Product"> | string | null
    categoryId?: StringFilter<"Product"> | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    discountPrices?: ProductDiscountPriceListRelationFilter
    weightDiscounts?: ProductWeightDiscountListRelationFilter
    nutrition?: ProductNutritionListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    regularPrice?: SortOrderInput | SortOrder
    length?: SortOrderInput | SortOrder
    breadth?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    packingWeight?: SortOrderInput | SortOrder
    tax?: SortOrder
    hsnsac?: SortOrderInput | SortOrder
    mainImage?: SortOrderInput | SortOrder
    images?: SortOrderInput | SortOrder
    inStock?: SortOrder
    approved?: SortOrder
    webVisible?: SortOrder
    stockCount?: SortOrderInput | SortOrder
    vegetable?: SortOrder
    veg?: SortOrder
    frozen?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    categoryId?: SortOrder
    category?: CategoryOrderByWithRelationInput
    discountPrices?: ProductDiscountPriceOrderByRelationAggregateInput
    weightDiscounts?: ProductWeightDiscountOrderByRelationAggregateInput
    nutrition?: ProductNutritionOrderByRelationAggregateInput
    _relevance?: ProductOrderByRelevanceInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: FloatFilter<"Product"> | number
    regularPrice?: FloatNullableFilter<"Product"> | number | null
    length?: FloatNullableFilter<"Product"> | number | null
    breadth?: FloatNullableFilter<"Product"> | number | null
    height?: FloatNullableFilter<"Product"> | number | null
    weight?: FloatNullableFilter<"Product"> | number | null
    packingWeight?: FloatNullableFilter<"Product"> | number | null
    tax?: IntFilter<"Product"> | number
    hsnsac?: StringNullableFilter<"Product"> | string | null
    mainImage?: StringNullableFilter<"Product"> | string | null
    images?: JsonNullableFilter<"Product">
    inStock?: BoolFilter<"Product"> | boolean
    approved?: BoolFilter<"Product"> | boolean
    webVisible?: BoolFilter<"Product"> | boolean
    stockCount?: IntNullableFilter<"Product"> | number | null
    vegetable?: BoolFilter<"Product"> | boolean
    veg?: BoolFilter<"Product"> | boolean
    frozen?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    createdBy?: StringFilter<"Product"> | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    updatedBy?: StringFilter<"Product"> | string
    approvedAt?: DateTimeNullableFilter<"Product"> | Date | string | null
    approvedBy?: StringNullableFilter<"Product"> | string | null
    categoryId?: StringFilter<"Product"> | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    discountPrices?: ProductDiscountPriceListRelationFilter
    weightDiscounts?: ProductWeightDiscountListRelationFilter
    nutrition?: ProductNutritionListRelationFilter
  }, "id" | "code">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    regularPrice?: SortOrderInput | SortOrder
    length?: SortOrderInput | SortOrder
    breadth?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    packingWeight?: SortOrderInput | SortOrder
    tax?: SortOrder
    hsnsac?: SortOrderInput | SortOrder
    mainImage?: SortOrderInput | SortOrder
    images?: SortOrderInput | SortOrder
    inStock?: SortOrder
    approved?: SortOrder
    webVisible?: SortOrder
    stockCount?: SortOrderInput | SortOrder
    vegetable?: SortOrder
    veg?: SortOrder
    frozen?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    categoryId?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    code?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    price?: FloatWithAggregatesFilter<"Product"> | number
    regularPrice?: FloatNullableWithAggregatesFilter<"Product"> | number | null
    length?: FloatNullableWithAggregatesFilter<"Product"> | number | null
    breadth?: FloatNullableWithAggregatesFilter<"Product"> | number | null
    height?: FloatNullableWithAggregatesFilter<"Product"> | number | null
    weight?: FloatNullableWithAggregatesFilter<"Product"> | number | null
    packingWeight?: FloatNullableWithAggregatesFilter<"Product"> | number | null
    tax?: IntWithAggregatesFilter<"Product"> | number
    hsnsac?: StringNullableWithAggregatesFilter<"Product"> | string | null
    mainImage?: StringNullableWithAggregatesFilter<"Product"> | string | null
    images?: JsonNullableWithAggregatesFilter<"Product">
    inStock?: BoolWithAggregatesFilter<"Product"> | boolean
    approved?: BoolWithAggregatesFilter<"Product"> | boolean
    webVisible?: BoolWithAggregatesFilter<"Product"> | boolean
    stockCount?: IntNullableWithAggregatesFilter<"Product"> | number | null
    vegetable?: BoolWithAggregatesFilter<"Product"> | boolean
    veg?: BoolWithAggregatesFilter<"Product"> | boolean
    frozen?: BoolWithAggregatesFilter<"Product"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    createdBy?: StringWithAggregatesFilter<"Product"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedBy?: StringWithAggregatesFilter<"Product"> | string
    approvedAt?: DateTimeNullableWithAggregatesFilter<"Product"> | Date | string | null
    approvedBy?: StringNullableWithAggregatesFilter<"Product"> | string | null
    categoryId?: StringWithAggregatesFilter<"Product"> | string
  }

  export type CategoryWeightDiscountWhereInput = {
    AND?: CategoryWeightDiscountWhereInput | CategoryWeightDiscountWhereInput[]
    OR?: CategoryWeightDiscountWhereInput[]
    NOT?: CategoryWeightDiscountWhereInput | CategoryWeightDiscountWhereInput[]
    id?: StringFilter<"CategoryWeightDiscount"> | string
    minWeight?: FloatFilter<"CategoryWeightDiscount"> | number
    categoryId?: StringFilter<"CategoryWeightDiscount"> | string
    createdAt?: DateTimeFilter<"CategoryWeightDiscount"> | Date | string
    updatedAt?: DateTimeFilter<"CategoryWeightDiscount"> | Date | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    productDiscounts?: ProductDiscountPriceListRelationFilter
  }

  export type CategoryWeightDiscountOrderByWithRelationInput = {
    id?: SortOrder
    minWeight?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    productDiscounts?: ProductDiscountPriceOrderByRelationAggregateInput
    _relevance?: CategoryWeightDiscountOrderByRelevanceInput
  }

  export type CategoryWeightDiscountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CategoryWeightDiscountWhereInput | CategoryWeightDiscountWhereInput[]
    OR?: CategoryWeightDiscountWhereInput[]
    NOT?: CategoryWeightDiscountWhereInput | CategoryWeightDiscountWhereInput[]
    minWeight?: FloatFilter<"CategoryWeightDiscount"> | number
    categoryId?: StringFilter<"CategoryWeightDiscount"> | string
    createdAt?: DateTimeFilter<"CategoryWeightDiscount"> | Date | string
    updatedAt?: DateTimeFilter<"CategoryWeightDiscount"> | Date | string
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    productDiscounts?: ProductDiscountPriceListRelationFilter
  }, "id">

  export type CategoryWeightDiscountOrderByWithAggregationInput = {
    id?: SortOrder
    minWeight?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryWeightDiscountCountOrderByAggregateInput
    _avg?: CategoryWeightDiscountAvgOrderByAggregateInput
    _max?: CategoryWeightDiscountMaxOrderByAggregateInput
    _min?: CategoryWeightDiscountMinOrderByAggregateInput
    _sum?: CategoryWeightDiscountSumOrderByAggregateInput
  }

  export type CategoryWeightDiscountScalarWhereWithAggregatesInput = {
    AND?: CategoryWeightDiscountScalarWhereWithAggregatesInput | CategoryWeightDiscountScalarWhereWithAggregatesInput[]
    OR?: CategoryWeightDiscountScalarWhereWithAggregatesInput[]
    NOT?: CategoryWeightDiscountScalarWhereWithAggregatesInput | CategoryWeightDiscountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CategoryWeightDiscount"> | string
    minWeight?: FloatWithAggregatesFilter<"CategoryWeightDiscount"> | number
    categoryId?: StringWithAggregatesFilter<"CategoryWeightDiscount"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CategoryWeightDiscount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CategoryWeightDiscount"> | Date | string
  }

  export type ProductDiscountPriceWhereInput = {
    AND?: ProductDiscountPriceWhereInput | ProductDiscountPriceWhereInput[]
    OR?: ProductDiscountPriceWhereInput[]
    NOT?: ProductDiscountPriceWhereInput | ProductDiscountPriceWhereInput[]
    id?: StringFilter<"ProductDiscountPrice"> | string
    productId?: StringFilter<"ProductDiscountPrice"> | string
    discountId?: StringFilter<"ProductDiscountPrice"> | string
    discountPrice?: FloatFilter<"ProductDiscountPrice"> | number
    createdAt?: DateTimeFilter<"ProductDiscountPrice"> | Date | string
    updatedAt?: DateTimeFilter<"ProductDiscountPrice"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    discount?: XOR<CategoryWeightDiscountScalarRelationFilter, CategoryWeightDiscountWhereInput>
  }

  export type ProductDiscountPriceOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    discountId?: SortOrder
    discountPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    discount?: CategoryWeightDiscountOrderByWithRelationInput
    _relevance?: ProductDiscountPriceOrderByRelevanceInput
  }

  export type ProductDiscountPriceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    productId_discountId?: ProductDiscountPriceProductIdDiscountIdCompoundUniqueInput
    AND?: ProductDiscountPriceWhereInput | ProductDiscountPriceWhereInput[]
    OR?: ProductDiscountPriceWhereInput[]
    NOT?: ProductDiscountPriceWhereInput | ProductDiscountPriceWhereInput[]
    productId?: StringFilter<"ProductDiscountPrice"> | string
    discountId?: StringFilter<"ProductDiscountPrice"> | string
    discountPrice?: FloatFilter<"ProductDiscountPrice"> | number
    createdAt?: DateTimeFilter<"ProductDiscountPrice"> | Date | string
    updatedAt?: DateTimeFilter<"ProductDiscountPrice"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    discount?: XOR<CategoryWeightDiscountScalarRelationFilter, CategoryWeightDiscountWhereInput>
  }, "id" | "productId_discountId">

  export type ProductDiscountPriceOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    discountId?: SortOrder
    discountPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductDiscountPriceCountOrderByAggregateInput
    _avg?: ProductDiscountPriceAvgOrderByAggregateInput
    _max?: ProductDiscountPriceMaxOrderByAggregateInput
    _min?: ProductDiscountPriceMinOrderByAggregateInput
    _sum?: ProductDiscountPriceSumOrderByAggregateInput
  }

  export type ProductDiscountPriceScalarWhereWithAggregatesInput = {
    AND?: ProductDiscountPriceScalarWhereWithAggregatesInput | ProductDiscountPriceScalarWhereWithAggregatesInput[]
    OR?: ProductDiscountPriceScalarWhereWithAggregatesInput[]
    NOT?: ProductDiscountPriceScalarWhereWithAggregatesInput | ProductDiscountPriceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductDiscountPrice"> | string
    productId?: StringWithAggregatesFilter<"ProductDiscountPrice"> | string
    discountId?: StringWithAggregatesFilter<"ProductDiscountPrice"> | string
    discountPrice?: FloatWithAggregatesFilter<"ProductDiscountPrice"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ProductDiscountPrice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductDiscountPrice"> | Date | string
  }

  export type ProductWeightDiscountWhereInput = {
    AND?: ProductWeightDiscountWhereInput | ProductWeightDiscountWhereInput[]
    OR?: ProductWeightDiscountWhereInput[]
    NOT?: ProductWeightDiscountWhereInput | ProductWeightDiscountWhereInput[]
    id?: StringFilter<"ProductWeightDiscount"> | string
    productId?: StringFilter<"ProductWeightDiscount"> | string
    minWeight?: FloatFilter<"ProductWeightDiscount"> | number
    price?: FloatFilter<"ProductWeightDiscount"> | number
    createdAt?: DateTimeFilter<"ProductWeightDiscount"> | Date | string
    updatedAt?: DateTimeFilter<"ProductWeightDiscount"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type ProductWeightDiscountOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    minWeight?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    _relevance?: ProductWeightDiscountOrderByRelevanceInput
  }

  export type ProductWeightDiscountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductWeightDiscountWhereInput | ProductWeightDiscountWhereInput[]
    OR?: ProductWeightDiscountWhereInput[]
    NOT?: ProductWeightDiscountWhereInput | ProductWeightDiscountWhereInput[]
    productId?: StringFilter<"ProductWeightDiscount"> | string
    minWeight?: FloatFilter<"ProductWeightDiscount"> | number
    price?: FloatFilter<"ProductWeightDiscount"> | number
    createdAt?: DateTimeFilter<"ProductWeightDiscount"> | Date | string
    updatedAt?: DateTimeFilter<"ProductWeightDiscount"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type ProductWeightDiscountOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    minWeight?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductWeightDiscountCountOrderByAggregateInput
    _avg?: ProductWeightDiscountAvgOrderByAggregateInput
    _max?: ProductWeightDiscountMaxOrderByAggregateInput
    _min?: ProductWeightDiscountMinOrderByAggregateInput
    _sum?: ProductWeightDiscountSumOrderByAggregateInput
  }

  export type ProductWeightDiscountScalarWhereWithAggregatesInput = {
    AND?: ProductWeightDiscountScalarWhereWithAggregatesInput | ProductWeightDiscountScalarWhereWithAggregatesInput[]
    OR?: ProductWeightDiscountScalarWhereWithAggregatesInput[]
    NOT?: ProductWeightDiscountScalarWhereWithAggregatesInput | ProductWeightDiscountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductWeightDiscount"> | string
    productId?: StringWithAggregatesFilter<"ProductWeightDiscount"> | string
    minWeight?: FloatWithAggregatesFilter<"ProductWeightDiscount"> | number
    price?: FloatWithAggregatesFilter<"ProductWeightDiscount"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ProductWeightDiscount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductWeightDiscount"> | Date | string
  }

  export type ProductNutritionWhereInput = {
    AND?: ProductNutritionWhereInput | ProductNutritionWhereInput[]
    OR?: ProductNutritionWhereInput[]
    NOT?: ProductNutritionWhereInput | ProductNutritionWhereInput[]
    id?: StringFilter<"ProductNutrition"> | string
    productId?: StringFilter<"ProductNutrition"> | string
    name?: StringFilter<"ProductNutrition"> | string
    grams?: FloatFilter<"ProductNutrition"> | number
    createdAt?: DateTimeFilter<"ProductNutrition"> | Date | string
    updatedAt?: DateTimeFilter<"ProductNutrition"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type ProductNutritionOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    grams?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    _relevance?: ProductNutritionOrderByRelevanceInput
  }

  export type ProductNutritionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductNutritionWhereInput | ProductNutritionWhereInput[]
    OR?: ProductNutritionWhereInput[]
    NOT?: ProductNutritionWhereInput | ProductNutritionWhereInput[]
    productId?: StringFilter<"ProductNutrition"> | string
    name?: StringFilter<"ProductNutrition"> | string
    grams?: FloatFilter<"ProductNutrition"> | number
    createdAt?: DateTimeFilter<"ProductNutrition"> | Date | string
    updatedAt?: DateTimeFilter<"ProductNutrition"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type ProductNutritionOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    grams?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductNutritionCountOrderByAggregateInput
    _avg?: ProductNutritionAvgOrderByAggregateInput
    _max?: ProductNutritionMaxOrderByAggregateInput
    _min?: ProductNutritionMinOrderByAggregateInput
    _sum?: ProductNutritionSumOrderByAggregateInput
  }

  export type ProductNutritionScalarWhereWithAggregatesInput = {
    AND?: ProductNutritionScalarWhereWithAggregatesInput | ProductNutritionScalarWhereWithAggregatesInput[]
    OR?: ProductNutritionScalarWhereWithAggregatesInput[]
    NOT?: ProductNutritionScalarWhereWithAggregatesInput | ProductNutritionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductNutrition"> | string
    productId?: StringWithAggregatesFilter<"ProductNutrition"> | string
    name?: StringWithAggregatesFilter<"ProductNutrition"> | string
    grams?: FloatWithAggregatesFilter<"ProductNutrition"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ProductNutrition"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductNutrition"> | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutCategoryInput
    weightDiscounts?: CategoryWeightDiscountCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
    weightDiscounts?: CategoryWeightDiscountUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
    weightDiscounts?: CategoryWeightDiscountUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
    weightDiscounts?: CategoryWeightDiscountUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    price: number
    regularPrice?: number | null
    length?: number | null
    breadth?: number | null
    height?: number | null
    weight?: number | null
    packingWeight?: number | null
    tax: number
    hsnsac?: string | null
    mainImage?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: boolean
    approved: boolean
    webVisible?: boolean
    stockCount?: number | null
    vegetable?: boolean
    veg?: boolean
    frozen?: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy: string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    category: CategoryCreateNestedOneWithoutProductsInput
    discountPrices?: ProductDiscountPriceCreateNestedManyWithoutProductInput
    weightDiscounts?: ProductWeightDiscountCreateNestedManyWithoutProductInput
    nutrition?: ProductNutritionCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    price: number
    regularPrice?: number | null
    length?: number | null
    breadth?: number | null
    height?: number | null
    weight?: number | null
    packingWeight?: number | null
    tax: number
    hsnsac?: string | null
    mainImage?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: boolean
    approved: boolean
    webVisible?: boolean
    stockCount?: number | null
    vegetable?: boolean
    veg?: boolean
    frozen?: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy: string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    categoryId: string
    discountPrices?: ProductDiscountPriceUncheckedCreateNestedManyWithoutProductInput
    weightDiscounts?: ProductWeightDiscountUncheckedCreateNestedManyWithoutProductInput
    nutrition?: ProductNutritionUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    regularPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    breadth?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    packingWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    tax?: IntFieldUpdateOperationsInput | number
    hsnsac?: NullableStringFieldUpdateOperationsInput | string | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    webVisible?: BoolFieldUpdateOperationsInput | boolean
    stockCount?: NullableIntFieldUpdateOperationsInput | number | null
    vegetable?: BoolFieldUpdateOperationsInput | boolean
    veg?: BoolFieldUpdateOperationsInput | boolean
    frozen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    discountPrices?: ProductDiscountPriceUpdateManyWithoutProductNestedInput
    weightDiscounts?: ProductWeightDiscountUpdateManyWithoutProductNestedInput
    nutrition?: ProductNutritionUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    regularPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    breadth?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    packingWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    tax?: IntFieldUpdateOperationsInput | number
    hsnsac?: NullableStringFieldUpdateOperationsInput | string | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    webVisible?: BoolFieldUpdateOperationsInput | boolean
    stockCount?: NullableIntFieldUpdateOperationsInput | number | null
    vegetable?: BoolFieldUpdateOperationsInput | boolean
    veg?: BoolFieldUpdateOperationsInput | boolean
    frozen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    discountPrices?: ProductDiscountPriceUncheckedUpdateManyWithoutProductNestedInput
    weightDiscounts?: ProductWeightDiscountUncheckedUpdateManyWithoutProductNestedInput
    nutrition?: ProductNutritionUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    price: number
    regularPrice?: number | null
    length?: number | null
    breadth?: number | null
    height?: number | null
    weight?: number | null
    packingWeight?: number | null
    tax: number
    hsnsac?: string | null
    mainImage?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: boolean
    approved: boolean
    webVisible?: boolean
    stockCount?: number | null
    vegetable?: boolean
    veg?: boolean
    frozen?: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy: string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    categoryId: string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    regularPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    breadth?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    packingWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    tax?: IntFieldUpdateOperationsInput | number
    hsnsac?: NullableStringFieldUpdateOperationsInput | string | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    webVisible?: BoolFieldUpdateOperationsInput | boolean
    stockCount?: NullableIntFieldUpdateOperationsInput | number | null
    vegetable?: BoolFieldUpdateOperationsInput | boolean
    veg?: BoolFieldUpdateOperationsInput | boolean
    frozen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    regularPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    breadth?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    packingWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    tax?: IntFieldUpdateOperationsInput | number
    hsnsac?: NullableStringFieldUpdateOperationsInput | string | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    webVisible?: BoolFieldUpdateOperationsInput | boolean
    stockCount?: NullableIntFieldUpdateOperationsInput | number | null
    vegetable?: BoolFieldUpdateOperationsInput | boolean
    veg?: BoolFieldUpdateOperationsInput | boolean
    frozen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryWeightDiscountCreateInput = {
    id?: string
    minWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutWeightDiscountsInput
    productDiscounts?: ProductDiscountPriceCreateNestedManyWithoutDiscountInput
  }

  export type CategoryWeightDiscountUncheckedCreateInput = {
    id?: string
    minWeight: number
    categoryId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    productDiscounts?: ProductDiscountPriceUncheckedCreateNestedManyWithoutDiscountInput
  }

  export type CategoryWeightDiscountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    minWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutWeightDiscountsNestedInput
    productDiscounts?: ProductDiscountPriceUpdateManyWithoutDiscountNestedInput
  }

  export type CategoryWeightDiscountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    minWeight?: FloatFieldUpdateOperationsInput | number
    categoryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productDiscounts?: ProductDiscountPriceUncheckedUpdateManyWithoutDiscountNestedInput
  }

  export type CategoryWeightDiscountCreateManyInput = {
    id?: string
    minWeight: number
    categoryId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryWeightDiscountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    minWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryWeightDiscountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    minWeight?: FloatFieldUpdateOperationsInput | number
    categoryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductDiscountPriceCreateInput = {
    id?: string
    discountPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutDiscountPricesInput
    discount: CategoryWeightDiscountCreateNestedOneWithoutProductDiscountsInput
  }

  export type ProductDiscountPriceUncheckedCreateInput = {
    id?: string
    productId: string
    discountId: string
    discountPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductDiscountPriceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    discountPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutDiscountPricesNestedInput
    discount?: CategoryWeightDiscountUpdateOneRequiredWithoutProductDiscountsNestedInput
  }

  export type ProductDiscountPriceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    discountId?: StringFieldUpdateOperationsInput | string
    discountPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductDiscountPriceCreateManyInput = {
    id?: string
    productId: string
    discountId: string
    discountPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductDiscountPriceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    discountPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductDiscountPriceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    discountId?: StringFieldUpdateOperationsInput | string
    discountPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductWeightDiscountCreateInput = {
    id?: string
    minWeight: number
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutWeightDiscountsInput
  }

  export type ProductWeightDiscountUncheckedCreateInput = {
    id?: string
    productId: string
    minWeight: number
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductWeightDiscountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    minWeight?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutWeightDiscountsNestedInput
  }

  export type ProductWeightDiscountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    minWeight?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductWeightDiscountCreateManyInput = {
    id?: string
    productId: string
    minWeight: number
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductWeightDiscountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    minWeight?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductWeightDiscountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    minWeight?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductNutritionCreateInput = {
    id?: string
    name: string
    grams: number
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutNutritionInput
  }

  export type ProductNutritionUncheckedCreateInput = {
    id?: string
    productId: string
    name: string
    grams: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductNutritionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grams?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutNutritionNestedInput
  }

  export type ProductNutritionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grams?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductNutritionCreateManyInput = {
    id?: string
    productId: string
    name: string
    grams: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductNutritionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grams?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductNutritionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grams?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type CategoryWeightDiscountListRelationFilter = {
    every?: CategoryWeightDiscountWhereInput
    some?: CategoryWeightDiscountWhereInput
    none?: CategoryWeightDiscountWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryWeightDiscountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryOrderByRelevanceInput = {
    fields: CategoryOrderByRelevanceFieldEnum | CategoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type ProductDiscountPriceListRelationFilter = {
    every?: ProductDiscountPriceWhereInput
    some?: ProductDiscountPriceWhereInput
    none?: ProductDiscountPriceWhereInput
  }

  export type ProductWeightDiscountListRelationFilter = {
    every?: ProductWeightDiscountWhereInput
    some?: ProductWeightDiscountWhereInput
    none?: ProductWeightDiscountWhereInput
  }

  export type ProductNutritionListRelationFilter = {
    every?: ProductNutritionWhereInput
    some?: ProductNutritionWhereInput
    none?: ProductNutritionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProductDiscountPriceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductWeightDiscountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductNutritionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelevanceInput = {
    fields: ProductOrderByRelevanceFieldEnum | ProductOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    regularPrice?: SortOrder
    length?: SortOrder
    breadth?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    packingWeight?: SortOrder
    tax?: SortOrder
    hsnsac?: SortOrder
    mainImage?: SortOrder
    images?: SortOrder
    inStock?: SortOrder
    approved?: SortOrder
    webVisible?: SortOrder
    stockCount?: SortOrder
    vegetable?: SortOrder
    veg?: SortOrder
    frozen?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    approvedAt?: SortOrder
    approvedBy?: SortOrder
    categoryId?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
    regularPrice?: SortOrder
    length?: SortOrder
    breadth?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    packingWeight?: SortOrder
    tax?: SortOrder
    stockCount?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    regularPrice?: SortOrder
    length?: SortOrder
    breadth?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    packingWeight?: SortOrder
    tax?: SortOrder
    hsnsac?: SortOrder
    mainImage?: SortOrder
    inStock?: SortOrder
    approved?: SortOrder
    webVisible?: SortOrder
    stockCount?: SortOrder
    vegetable?: SortOrder
    veg?: SortOrder
    frozen?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    approvedAt?: SortOrder
    approvedBy?: SortOrder
    categoryId?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    regularPrice?: SortOrder
    length?: SortOrder
    breadth?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    packingWeight?: SortOrder
    tax?: SortOrder
    hsnsac?: SortOrder
    mainImage?: SortOrder
    inStock?: SortOrder
    approved?: SortOrder
    webVisible?: SortOrder
    stockCount?: SortOrder
    vegetable?: SortOrder
    veg?: SortOrder
    frozen?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
    approvedAt?: SortOrder
    approvedBy?: SortOrder
    categoryId?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
    regularPrice?: SortOrder
    length?: SortOrder
    breadth?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    packingWeight?: SortOrder
    tax?: SortOrder
    stockCount?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CategoryWeightDiscountOrderByRelevanceInput = {
    fields: CategoryWeightDiscountOrderByRelevanceFieldEnum | CategoryWeightDiscountOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CategoryWeightDiscountCountOrderByAggregateInput = {
    id?: SortOrder
    minWeight?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryWeightDiscountAvgOrderByAggregateInput = {
    minWeight?: SortOrder
  }

  export type CategoryWeightDiscountMaxOrderByAggregateInput = {
    id?: SortOrder
    minWeight?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryWeightDiscountMinOrderByAggregateInput = {
    id?: SortOrder
    minWeight?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryWeightDiscountSumOrderByAggregateInput = {
    minWeight?: SortOrder
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type CategoryWeightDiscountScalarRelationFilter = {
    is?: CategoryWeightDiscountWhereInput
    isNot?: CategoryWeightDiscountWhereInput
  }

  export type ProductDiscountPriceOrderByRelevanceInput = {
    fields: ProductDiscountPriceOrderByRelevanceFieldEnum | ProductDiscountPriceOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProductDiscountPriceProductIdDiscountIdCompoundUniqueInput = {
    productId: string
    discountId: string
  }

  export type ProductDiscountPriceCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    discountId?: SortOrder
    discountPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductDiscountPriceAvgOrderByAggregateInput = {
    discountPrice?: SortOrder
  }

  export type ProductDiscountPriceMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    discountId?: SortOrder
    discountPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductDiscountPriceMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    discountId?: SortOrder
    discountPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductDiscountPriceSumOrderByAggregateInput = {
    discountPrice?: SortOrder
  }

  export type ProductWeightDiscountOrderByRelevanceInput = {
    fields: ProductWeightDiscountOrderByRelevanceFieldEnum | ProductWeightDiscountOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProductWeightDiscountCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    minWeight?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductWeightDiscountAvgOrderByAggregateInput = {
    minWeight?: SortOrder
    price?: SortOrder
  }

  export type ProductWeightDiscountMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    minWeight?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductWeightDiscountMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    minWeight?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductWeightDiscountSumOrderByAggregateInput = {
    minWeight?: SortOrder
    price?: SortOrder
  }

  export type ProductNutritionOrderByRelevanceInput = {
    fields: ProductNutritionOrderByRelevanceFieldEnum | ProductNutritionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProductNutritionCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    grams?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductNutritionAvgOrderByAggregateInput = {
    grams?: SortOrder
  }

  export type ProductNutritionMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    grams?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductNutritionMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    grams?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductNutritionSumOrderByAggregateInput = {
    grams?: SortOrder
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CategoryWeightDiscountCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CategoryWeightDiscountCreateWithoutCategoryInput, CategoryWeightDiscountUncheckedCreateWithoutCategoryInput> | CategoryWeightDiscountCreateWithoutCategoryInput[] | CategoryWeightDiscountUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryWeightDiscountCreateOrConnectWithoutCategoryInput | CategoryWeightDiscountCreateOrConnectWithoutCategoryInput[]
    createMany?: CategoryWeightDiscountCreateManyCategoryInputEnvelope
    connect?: CategoryWeightDiscountWhereUniqueInput | CategoryWeightDiscountWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CategoryWeightDiscountUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CategoryWeightDiscountCreateWithoutCategoryInput, CategoryWeightDiscountUncheckedCreateWithoutCategoryInput> | CategoryWeightDiscountCreateWithoutCategoryInput[] | CategoryWeightDiscountUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryWeightDiscountCreateOrConnectWithoutCategoryInput | CategoryWeightDiscountCreateOrConnectWithoutCategoryInput[]
    createMany?: CategoryWeightDiscountCreateManyCategoryInputEnvelope
    connect?: CategoryWeightDiscountWhereUniqueInput | CategoryWeightDiscountWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CategoryWeightDiscountUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CategoryWeightDiscountCreateWithoutCategoryInput, CategoryWeightDiscountUncheckedCreateWithoutCategoryInput> | CategoryWeightDiscountCreateWithoutCategoryInput[] | CategoryWeightDiscountUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryWeightDiscountCreateOrConnectWithoutCategoryInput | CategoryWeightDiscountCreateOrConnectWithoutCategoryInput[]
    upsert?: CategoryWeightDiscountUpsertWithWhereUniqueWithoutCategoryInput | CategoryWeightDiscountUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CategoryWeightDiscountCreateManyCategoryInputEnvelope
    set?: CategoryWeightDiscountWhereUniqueInput | CategoryWeightDiscountWhereUniqueInput[]
    disconnect?: CategoryWeightDiscountWhereUniqueInput | CategoryWeightDiscountWhereUniqueInput[]
    delete?: CategoryWeightDiscountWhereUniqueInput | CategoryWeightDiscountWhereUniqueInput[]
    connect?: CategoryWeightDiscountWhereUniqueInput | CategoryWeightDiscountWhereUniqueInput[]
    update?: CategoryWeightDiscountUpdateWithWhereUniqueWithoutCategoryInput | CategoryWeightDiscountUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CategoryWeightDiscountUpdateManyWithWhereWithoutCategoryInput | CategoryWeightDiscountUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CategoryWeightDiscountScalarWhereInput | CategoryWeightDiscountScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CategoryWeightDiscountUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CategoryWeightDiscountCreateWithoutCategoryInput, CategoryWeightDiscountUncheckedCreateWithoutCategoryInput> | CategoryWeightDiscountCreateWithoutCategoryInput[] | CategoryWeightDiscountUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoryWeightDiscountCreateOrConnectWithoutCategoryInput | CategoryWeightDiscountCreateOrConnectWithoutCategoryInput[]
    upsert?: CategoryWeightDiscountUpsertWithWhereUniqueWithoutCategoryInput | CategoryWeightDiscountUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CategoryWeightDiscountCreateManyCategoryInputEnvelope
    set?: CategoryWeightDiscountWhereUniqueInput | CategoryWeightDiscountWhereUniqueInput[]
    disconnect?: CategoryWeightDiscountWhereUniqueInput | CategoryWeightDiscountWhereUniqueInput[]
    delete?: CategoryWeightDiscountWhereUniqueInput | CategoryWeightDiscountWhereUniqueInput[]
    connect?: CategoryWeightDiscountWhereUniqueInput | CategoryWeightDiscountWhereUniqueInput[]
    update?: CategoryWeightDiscountUpdateWithWhereUniqueWithoutCategoryInput | CategoryWeightDiscountUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CategoryWeightDiscountUpdateManyWithWhereWithoutCategoryInput | CategoryWeightDiscountUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CategoryWeightDiscountScalarWhereInput | CategoryWeightDiscountScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type ProductDiscountPriceCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductDiscountPriceCreateWithoutProductInput, ProductDiscountPriceUncheckedCreateWithoutProductInput> | ProductDiscountPriceCreateWithoutProductInput[] | ProductDiscountPriceUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductDiscountPriceCreateOrConnectWithoutProductInput | ProductDiscountPriceCreateOrConnectWithoutProductInput[]
    createMany?: ProductDiscountPriceCreateManyProductInputEnvelope
    connect?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
  }

  export type ProductWeightDiscountCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductWeightDiscountCreateWithoutProductInput, ProductWeightDiscountUncheckedCreateWithoutProductInput> | ProductWeightDiscountCreateWithoutProductInput[] | ProductWeightDiscountUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductWeightDiscountCreateOrConnectWithoutProductInput | ProductWeightDiscountCreateOrConnectWithoutProductInput[]
    createMany?: ProductWeightDiscountCreateManyProductInputEnvelope
    connect?: ProductWeightDiscountWhereUniqueInput | ProductWeightDiscountWhereUniqueInput[]
  }

  export type ProductNutritionCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductNutritionCreateWithoutProductInput, ProductNutritionUncheckedCreateWithoutProductInput> | ProductNutritionCreateWithoutProductInput[] | ProductNutritionUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductNutritionCreateOrConnectWithoutProductInput | ProductNutritionCreateOrConnectWithoutProductInput[]
    createMany?: ProductNutritionCreateManyProductInputEnvelope
    connect?: ProductNutritionWhereUniqueInput | ProductNutritionWhereUniqueInput[]
  }

  export type ProductDiscountPriceUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductDiscountPriceCreateWithoutProductInput, ProductDiscountPriceUncheckedCreateWithoutProductInput> | ProductDiscountPriceCreateWithoutProductInput[] | ProductDiscountPriceUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductDiscountPriceCreateOrConnectWithoutProductInput | ProductDiscountPriceCreateOrConnectWithoutProductInput[]
    createMany?: ProductDiscountPriceCreateManyProductInputEnvelope
    connect?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
  }

  export type ProductWeightDiscountUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductWeightDiscountCreateWithoutProductInput, ProductWeightDiscountUncheckedCreateWithoutProductInput> | ProductWeightDiscountCreateWithoutProductInput[] | ProductWeightDiscountUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductWeightDiscountCreateOrConnectWithoutProductInput | ProductWeightDiscountCreateOrConnectWithoutProductInput[]
    createMany?: ProductWeightDiscountCreateManyProductInputEnvelope
    connect?: ProductWeightDiscountWhereUniqueInput | ProductWeightDiscountWhereUniqueInput[]
  }

  export type ProductNutritionUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductNutritionCreateWithoutProductInput, ProductNutritionUncheckedCreateWithoutProductInput> | ProductNutritionCreateWithoutProductInput[] | ProductNutritionUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductNutritionCreateOrConnectWithoutProductInput | ProductNutritionCreateOrConnectWithoutProductInput[]
    createMany?: ProductNutritionCreateManyProductInputEnvelope
    connect?: ProductNutritionWhereUniqueInput | ProductNutritionWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type ProductDiscountPriceUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductDiscountPriceCreateWithoutProductInput, ProductDiscountPriceUncheckedCreateWithoutProductInput> | ProductDiscountPriceCreateWithoutProductInput[] | ProductDiscountPriceUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductDiscountPriceCreateOrConnectWithoutProductInput | ProductDiscountPriceCreateOrConnectWithoutProductInput[]
    upsert?: ProductDiscountPriceUpsertWithWhereUniqueWithoutProductInput | ProductDiscountPriceUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductDiscountPriceCreateManyProductInputEnvelope
    set?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
    disconnect?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
    delete?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
    connect?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
    update?: ProductDiscountPriceUpdateWithWhereUniqueWithoutProductInput | ProductDiscountPriceUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductDiscountPriceUpdateManyWithWhereWithoutProductInput | ProductDiscountPriceUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductDiscountPriceScalarWhereInput | ProductDiscountPriceScalarWhereInput[]
  }

  export type ProductWeightDiscountUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductWeightDiscountCreateWithoutProductInput, ProductWeightDiscountUncheckedCreateWithoutProductInput> | ProductWeightDiscountCreateWithoutProductInput[] | ProductWeightDiscountUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductWeightDiscountCreateOrConnectWithoutProductInput | ProductWeightDiscountCreateOrConnectWithoutProductInput[]
    upsert?: ProductWeightDiscountUpsertWithWhereUniqueWithoutProductInput | ProductWeightDiscountUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductWeightDiscountCreateManyProductInputEnvelope
    set?: ProductWeightDiscountWhereUniqueInput | ProductWeightDiscountWhereUniqueInput[]
    disconnect?: ProductWeightDiscountWhereUniqueInput | ProductWeightDiscountWhereUniqueInput[]
    delete?: ProductWeightDiscountWhereUniqueInput | ProductWeightDiscountWhereUniqueInput[]
    connect?: ProductWeightDiscountWhereUniqueInput | ProductWeightDiscountWhereUniqueInput[]
    update?: ProductWeightDiscountUpdateWithWhereUniqueWithoutProductInput | ProductWeightDiscountUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductWeightDiscountUpdateManyWithWhereWithoutProductInput | ProductWeightDiscountUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductWeightDiscountScalarWhereInput | ProductWeightDiscountScalarWhereInput[]
  }

  export type ProductNutritionUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductNutritionCreateWithoutProductInput, ProductNutritionUncheckedCreateWithoutProductInput> | ProductNutritionCreateWithoutProductInput[] | ProductNutritionUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductNutritionCreateOrConnectWithoutProductInput | ProductNutritionCreateOrConnectWithoutProductInput[]
    upsert?: ProductNutritionUpsertWithWhereUniqueWithoutProductInput | ProductNutritionUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductNutritionCreateManyProductInputEnvelope
    set?: ProductNutritionWhereUniqueInput | ProductNutritionWhereUniqueInput[]
    disconnect?: ProductNutritionWhereUniqueInput | ProductNutritionWhereUniqueInput[]
    delete?: ProductNutritionWhereUniqueInput | ProductNutritionWhereUniqueInput[]
    connect?: ProductNutritionWhereUniqueInput | ProductNutritionWhereUniqueInput[]
    update?: ProductNutritionUpdateWithWhereUniqueWithoutProductInput | ProductNutritionUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductNutritionUpdateManyWithWhereWithoutProductInput | ProductNutritionUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductNutritionScalarWhereInput | ProductNutritionScalarWhereInput[]
  }

  export type ProductDiscountPriceUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductDiscountPriceCreateWithoutProductInput, ProductDiscountPriceUncheckedCreateWithoutProductInput> | ProductDiscountPriceCreateWithoutProductInput[] | ProductDiscountPriceUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductDiscountPriceCreateOrConnectWithoutProductInput | ProductDiscountPriceCreateOrConnectWithoutProductInput[]
    upsert?: ProductDiscountPriceUpsertWithWhereUniqueWithoutProductInput | ProductDiscountPriceUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductDiscountPriceCreateManyProductInputEnvelope
    set?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
    disconnect?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
    delete?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
    connect?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
    update?: ProductDiscountPriceUpdateWithWhereUniqueWithoutProductInput | ProductDiscountPriceUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductDiscountPriceUpdateManyWithWhereWithoutProductInput | ProductDiscountPriceUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductDiscountPriceScalarWhereInput | ProductDiscountPriceScalarWhereInput[]
  }

  export type ProductWeightDiscountUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductWeightDiscountCreateWithoutProductInput, ProductWeightDiscountUncheckedCreateWithoutProductInput> | ProductWeightDiscountCreateWithoutProductInput[] | ProductWeightDiscountUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductWeightDiscountCreateOrConnectWithoutProductInput | ProductWeightDiscountCreateOrConnectWithoutProductInput[]
    upsert?: ProductWeightDiscountUpsertWithWhereUniqueWithoutProductInput | ProductWeightDiscountUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductWeightDiscountCreateManyProductInputEnvelope
    set?: ProductWeightDiscountWhereUniqueInput | ProductWeightDiscountWhereUniqueInput[]
    disconnect?: ProductWeightDiscountWhereUniqueInput | ProductWeightDiscountWhereUniqueInput[]
    delete?: ProductWeightDiscountWhereUniqueInput | ProductWeightDiscountWhereUniqueInput[]
    connect?: ProductWeightDiscountWhereUniqueInput | ProductWeightDiscountWhereUniqueInput[]
    update?: ProductWeightDiscountUpdateWithWhereUniqueWithoutProductInput | ProductWeightDiscountUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductWeightDiscountUpdateManyWithWhereWithoutProductInput | ProductWeightDiscountUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductWeightDiscountScalarWhereInput | ProductWeightDiscountScalarWhereInput[]
  }

  export type ProductNutritionUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductNutritionCreateWithoutProductInput, ProductNutritionUncheckedCreateWithoutProductInput> | ProductNutritionCreateWithoutProductInput[] | ProductNutritionUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductNutritionCreateOrConnectWithoutProductInput | ProductNutritionCreateOrConnectWithoutProductInput[]
    upsert?: ProductNutritionUpsertWithWhereUniqueWithoutProductInput | ProductNutritionUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductNutritionCreateManyProductInputEnvelope
    set?: ProductNutritionWhereUniqueInput | ProductNutritionWhereUniqueInput[]
    disconnect?: ProductNutritionWhereUniqueInput | ProductNutritionWhereUniqueInput[]
    delete?: ProductNutritionWhereUniqueInput | ProductNutritionWhereUniqueInput[]
    connect?: ProductNutritionWhereUniqueInput | ProductNutritionWhereUniqueInput[]
    update?: ProductNutritionUpdateWithWhereUniqueWithoutProductInput | ProductNutritionUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductNutritionUpdateManyWithWhereWithoutProductInput | ProductNutritionUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductNutritionScalarWhereInput | ProductNutritionScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutWeightDiscountsInput = {
    create?: XOR<CategoryCreateWithoutWeightDiscountsInput, CategoryUncheckedCreateWithoutWeightDiscountsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutWeightDiscountsInput
    connect?: CategoryWhereUniqueInput
  }

  export type ProductDiscountPriceCreateNestedManyWithoutDiscountInput = {
    create?: XOR<ProductDiscountPriceCreateWithoutDiscountInput, ProductDiscountPriceUncheckedCreateWithoutDiscountInput> | ProductDiscountPriceCreateWithoutDiscountInput[] | ProductDiscountPriceUncheckedCreateWithoutDiscountInput[]
    connectOrCreate?: ProductDiscountPriceCreateOrConnectWithoutDiscountInput | ProductDiscountPriceCreateOrConnectWithoutDiscountInput[]
    createMany?: ProductDiscountPriceCreateManyDiscountInputEnvelope
    connect?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
  }

  export type ProductDiscountPriceUncheckedCreateNestedManyWithoutDiscountInput = {
    create?: XOR<ProductDiscountPriceCreateWithoutDiscountInput, ProductDiscountPriceUncheckedCreateWithoutDiscountInput> | ProductDiscountPriceCreateWithoutDiscountInput[] | ProductDiscountPriceUncheckedCreateWithoutDiscountInput[]
    connectOrCreate?: ProductDiscountPriceCreateOrConnectWithoutDiscountInput | ProductDiscountPriceCreateOrConnectWithoutDiscountInput[]
    createMany?: ProductDiscountPriceCreateManyDiscountInputEnvelope
    connect?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
  }

  export type CategoryUpdateOneRequiredWithoutWeightDiscountsNestedInput = {
    create?: XOR<CategoryCreateWithoutWeightDiscountsInput, CategoryUncheckedCreateWithoutWeightDiscountsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutWeightDiscountsInput
    upsert?: CategoryUpsertWithoutWeightDiscountsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutWeightDiscountsInput, CategoryUpdateWithoutWeightDiscountsInput>, CategoryUncheckedUpdateWithoutWeightDiscountsInput>
  }

  export type ProductDiscountPriceUpdateManyWithoutDiscountNestedInput = {
    create?: XOR<ProductDiscountPriceCreateWithoutDiscountInput, ProductDiscountPriceUncheckedCreateWithoutDiscountInput> | ProductDiscountPriceCreateWithoutDiscountInput[] | ProductDiscountPriceUncheckedCreateWithoutDiscountInput[]
    connectOrCreate?: ProductDiscountPriceCreateOrConnectWithoutDiscountInput | ProductDiscountPriceCreateOrConnectWithoutDiscountInput[]
    upsert?: ProductDiscountPriceUpsertWithWhereUniqueWithoutDiscountInput | ProductDiscountPriceUpsertWithWhereUniqueWithoutDiscountInput[]
    createMany?: ProductDiscountPriceCreateManyDiscountInputEnvelope
    set?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
    disconnect?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
    delete?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
    connect?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
    update?: ProductDiscountPriceUpdateWithWhereUniqueWithoutDiscountInput | ProductDiscountPriceUpdateWithWhereUniqueWithoutDiscountInput[]
    updateMany?: ProductDiscountPriceUpdateManyWithWhereWithoutDiscountInput | ProductDiscountPriceUpdateManyWithWhereWithoutDiscountInput[]
    deleteMany?: ProductDiscountPriceScalarWhereInput | ProductDiscountPriceScalarWhereInput[]
  }

  export type ProductDiscountPriceUncheckedUpdateManyWithoutDiscountNestedInput = {
    create?: XOR<ProductDiscountPriceCreateWithoutDiscountInput, ProductDiscountPriceUncheckedCreateWithoutDiscountInput> | ProductDiscountPriceCreateWithoutDiscountInput[] | ProductDiscountPriceUncheckedCreateWithoutDiscountInput[]
    connectOrCreate?: ProductDiscountPriceCreateOrConnectWithoutDiscountInput | ProductDiscountPriceCreateOrConnectWithoutDiscountInput[]
    upsert?: ProductDiscountPriceUpsertWithWhereUniqueWithoutDiscountInput | ProductDiscountPriceUpsertWithWhereUniqueWithoutDiscountInput[]
    createMany?: ProductDiscountPriceCreateManyDiscountInputEnvelope
    set?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
    disconnect?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
    delete?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
    connect?: ProductDiscountPriceWhereUniqueInput | ProductDiscountPriceWhereUniqueInput[]
    update?: ProductDiscountPriceUpdateWithWhereUniqueWithoutDiscountInput | ProductDiscountPriceUpdateWithWhereUniqueWithoutDiscountInput[]
    updateMany?: ProductDiscountPriceUpdateManyWithWhereWithoutDiscountInput | ProductDiscountPriceUpdateManyWithWhereWithoutDiscountInput[]
    deleteMany?: ProductDiscountPriceScalarWhereInput | ProductDiscountPriceScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutDiscountPricesInput = {
    create?: XOR<ProductCreateWithoutDiscountPricesInput, ProductUncheckedCreateWithoutDiscountPricesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutDiscountPricesInput
    connect?: ProductWhereUniqueInput
  }

  export type CategoryWeightDiscountCreateNestedOneWithoutProductDiscountsInput = {
    create?: XOR<CategoryWeightDiscountCreateWithoutProductDiscountsInput, CategoryWeightDiscountUncheckedCreateWithoutProductDiscountsInput>
    connectOrCreate?: CategoryWeightDiscountCreateOrConnectWithoutProductDiscountsInput
    connect?: CategoryWeightDiscountWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutDiscountPricesNestedInput = {
    create?: XOR<ProductCreateWithoutDiscountPricesInput, ProductUncheckedCreateWithoutDiscountPricesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutDiscountPricesInput
    upsert?: ProductUpsertWithoutDiscountPricesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutDiscountPricesInput, ProductUpdateWithoutDiscountPricesInput>, ProductUncheckedUpdateWithoutDiscountPricesInput>
  }

  export type CategoryWeightDiscountUpdateOneRequiredWithoutProductDiscountsNestedInput = {
    create?: XOR<CategoryWeightDiscountCreateWithoutProductDiscountsInput, CategoryWeightDiscountUncheckedCreateWithoutProductDiscountsInput>
    connectOrCreate?: CategoryWeightDiscountCreateOrConnectWithoutProductDiscountsInput
    upsert?: CategoryWeightDiscountUpsertWithoutProductDiscountsInput
    connect?: CategoryWeightDiscountWhereUniqueInput
    update?: XOR<XOR<CategoryWeightDiscountUpdateToOneWithWhereWithoutProductDiscountsInput, CategoryWeightDiscountUpdateWithoutProductDiscountsInput>, CategoryWeightDiscountUncheckedUpdateWithoutProductDiscountsInput>
  }

  export type ProductCreateNestedOneWithoutWeightDiscountsInput = {
    create?: XOR<ProductCreateWithoutWeightDiscountsInput, ProductUncheckedCreateWithoutWeightDiscountsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutWeightDiscountsInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutWeightDiscountsNestedInput = {
    create?: XOR<ProductCreateWithoutWeightDiscountsInput, ProductUncheckedCreateWithoutWeightDiscountsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutWeightDiscountsInput
    upsert?: ProductUpsertWithoutWeightDiscountsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutWeightDiscountsInput, ProductUpdateWithoutWeightDiscountsInput>, ProductUncheckedUpdateWithoutWeightDiscountsInput>
  }

  export type ProductCreateNestedOneWithoutNutritionInput = {
    create?: XOR<ProductCreateWithoutNutritionInput, ProductUncheckedCreateWithoutNutritionInput>
    connectOrCreate?: ProductCreateOrConnectWithoutNutritionInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutNutritionNestedInput = {
    create?: XOR<ProductCreateWithoutNutritionInput, ProductUncheckedCreateWithoutNutritionInput>
    connectOrCreate?: ProductCreateOrConnectWithoutNutritionInput
    upsert?: ProductUpsertWithoutNutritionInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutNutritionInput, ProductUpdateWithoutNutritionInput>, ProductUncheckedUpdateWithoutNutritionInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ProductCreateWithoutCategoryInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    price: number
    regularPrice?: number | null
    length?: number | null
    breadth?: number | null
    height?: number | null
    weight?: number | null
    packingWeight?: number | null
    tax: number
    hsnsac?: string | null
    mainImage?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: boolean
    approved: boolean
    webVisible?: boolean
    stockCount?: number | null
    vegetable?: boolean
    veg?: boolean
    frozen?: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy: string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    discountPrices?: ProductDiscountPriceCreateNestedManyWithoutProductInput
    weightDiscounts?: ProductWeightDiscountCreateNestedManyWithoutProductInput
    nutrition?: ProductNutritionCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    price: number
    regularPrice?: number | null
    length?: number | null
    breadth?: number | null
    height?: number | null
    weight?: number | null
    packingWeight?: number | null
    tax: number
    hsnsac?: string | null
    mainImage?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: boolean
    approved: boolean
    webVisible?: boolean
    stockCount?: number | null
    vegetable?: boolean
    veg?: boolean
    frozen?: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy: string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    discountPrices?: ProductDiscountPriceUncheckedCreateNestedManyWithoutProductInput
    weightDiscounts?: ProductWeightDiscountUncheckedCreateNestedManyWithoutProductInput
    nutrition?: ProductNutritionUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type CategoryWeightDiscountCreateWithoutCategoryInput = {
    id?: string
    minWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
    productDiscounts?: ProductDiscountPriceCreateNestedManyWithoutDiscountInput
  }

  export type CategoryWeightDiscountUncheckedCreateWithoutCategoryInput = {
    id?: string
    minWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
    productDiscounts?: ProductDiscountPriceUncheckedCreateNestedManyWithoutDiscountInput
  }

  export type CategoryWeightDiscountCreateOrConnectWithoutCategoryInput = {
    where: CategoryWeightDiscountWhereUniqueInput
    create: XOR<CategoryWeightDiscountCreateWithoutCategoryInput, CategoryWeightDiscountUncheckedCreateWithoutCategoryInput>
  }

  export type CategoryWeightDiscountCreateManyCategoryInputEnvelope = {
    data: CategoryWeightDiscountCreateManyCategoryInput | CategoryWeightDiscountCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    code?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: FloatFilter<"Product"> | number
    regularPrice?: FloatNullableFilter<"Product"> | number | null
    length?: FloatNullableFilter<"Product"> | number | null
    breadth?: FloatNullableFilter<"Product"> | number | null
    height?: FloatNullableFilter<"Product"> | number | null
    weight?: FloatNullableFilter<"Product"> | number | null
    packingWeight?: FloatNullableFilter<"Product"> | number | null
    tax?: IntFilter<"Product"> | number
    hsnsac?: StringNullableFilter<"Product"> | string | null
    mainImage?: StringNullableFilter<"Product"> | string | null
    images?: JsonNullableFilter<"Product">
    inStock?: BoolFilter<"Product"> | boolean
    approved?: BoolFilter<"Product"> | boolean
    webVisible?: BoolFilter<"Product"> | boolean
    stockCount?: IntNullableFilter<"Product"> | number | null
    vegetable?: BoolFilter<"Product"> | boolean
    veg?: BoolFilter<"Product"> | boolean
    frozen?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    createdBy?: StringFilter<"Product"> | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    updatedBy?: StringFilter<"Product"> | string
    approvedAt?: DateTimeNullableFilter<"Product"> | Date | string | null
    approvedBy?: StringNullableFilter<"Product"> | string | null
    categoryId?: StringFilter<"Product"> | string
  }

  export type CategoryWeightDiscountUpsertWithWhereUniqueWithoutCategoryInput = {
    where: CategoryWeightDiscountWhereUniqueInput
    update: XOR<CategoryWeightDiscountUpdateWithoutCategoryInput, CategoryWeightDiscountUncheckedUpdateWithoutCategoryInput>
    create: XOR<CategoryWeightDiscountCreateWithoutCategoryInput, CategoryWeightDiscountUncheckedCreateWithoutCategoryInput>
  }

  export type CategoryWeightDiscountUpdateWithWhereUniqueWithoutCategoryInput = {
    where: CategoryWeightDiscountWhereUniqueInput
    data: XOR<CategoryWeightDiscountUpdateWithoutCategoryInput, CategoryWeightDiscountUncheckedUpdateWithoutCategoryInput>
  }

  export type CategoryWeightDiscountUpdateManyWithWhereWithoutCategoryInput = {
    where: CategoryWeightDiscountScalarWhereInput
    data: XOR<CategoryWeightDiscountUpdateManyMutationInput, CategoryWeightDiscountUncheckedUpdateManyWithoutCategoryInput>
  }

  export type CategoryWeightDiscountScalarWhereInput = {
    AND?: CategoryWeightDiscountScalarWhereInput | CategoryWeightDiscountScalarWhereInput[]
    OR?: CategoryWeightDiscountScalarWhereInput[]
    NOT?: CategoryWeightDiscountScalarWhereInput | CategoryWeightDiscountScalarWhereInput[]
    id?: StringFilter<"CategoryWeightDiscount"> | string
    minWeight?: FloatFilter<"CategoryWeightDiscount"> | number
    categoryId?: StringFilter<"CategoryWeightDiscount"> | string
    createdAt?: DateTimeFilter<"CategoryWeightDiscount"> | Date | string
    updatedAt?: DateTimeFilter<"CategoryWeightDiscount"> | Date | string
  }

  export type CategoryCreateWithoutProductsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weightDiscounts?: CategoryWeightDiscountCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    weightDiscounts?: CategoryWeightDiscountUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type ProductDiscountPriceCreateWithoutProductInput = {
    id?: string
    discountPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
    discount: CategoryWeightDiscountCreateNestedOneWithoutProductDiscountsInput
  }

  export type ProductDiscountPriceUncheckedCreateWithoutProductInput = {
    id?: string
    discountId: string
    discountPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductDiscountPriceCreateOrConnectWithoutProductInput = {
    where: ProductDiscountPriceWhereUniqueInput
    create: XOR<ProductDiscountPriceCreateWithoutProductInput, ProductDiscountPriceUncheckedCreateWithoutProductInput>
  }

  export type ProductDiscountPriceCreateManyProductInputEnvelope = {
    data: ProductDiscountPriceCreateManyProductInput | ProductDiscountPriceCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductWeightDiscountCreateWithoutProductInput = {
    id?: string
    minWeight: number
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductWeightDiscountUncheckedCreateWithoutProductInput = {
    id?: string
    minWeight: number
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductWeightDiscountCreateOrConnectWithoutProductInput = {
    where: ProductWeightDiscountWhereUniqueInput
    create: XOR<ProductWeightDiscountCreateWithoutProductInput, ProductWeightDiscountUncheckedCreateWithoutProductInput>
  }

  export type ProductWeightDiscountCreateManyProductInputEnvelope = {
    data: ProductWeightDiscountCreateManyProductInput | ProductWeightDiscountCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductNutritionCreateWithoutProductInput = {
    id?: string
    name: string
    grams: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductNutritionUncheckedCreateWithoutProductInput = {
    id?: string
    name: string
    grams: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductNutritionCreateOrConnectWithoutProductInput = {
    where: ProductNutritionWhereUniqueInput
    create: XOR<ProductNutritionCreateWithoutProductInput, ProductNutritionUncheckedCreateWithoutProductInput>
  }

  export type ProductNutritionCreateManyProductInputEnvelope = {
    data: ProductNutritionCreateManyProductInput | ProductNutritionCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weightDiscounts?: CategoryWeightDiscountUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    weightDiscounts?: CategoryWeightDiscountUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ProductDiscountPriceUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductDiscountPriceWhereUniqueInput
    update: XOR<ProductDiscountPriceUpdateWithoutProductInput, ProductDiscountPriceUncheckedUpdateWithoutProductInput>
    create: XOR<ProductDiscountPriceCreateWithoutProductInput, ProductDiscountPriceUncheckedCreateWithoutProductInput>
  }

  export type ProductDiscountPriceUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductDiscountPriceWhereUniqueInput
    data: XOR<ProductDiscountPriceUpdateWithoutProductInput, ProductDiscountPriceUncheckedUpdateWithoutProductInput>
  }

  export type ProductDiscountPriceUpdateManyWithWhereWithoutProductInput = {
    where: ProductDiscountPriceScalarWhereInput
    data: XOR<ProductDiscountPriceUpdateManyMutationInput, ProductDiscountPriceUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductDiscountPriceScalarWhereInput = {
    AND?: ProductDiscountPriceScalarWhereInput | ProductDiscountPriceScalarWhereInput[]
    OR?: ProductDiscountPriceScalarWhereInput[]
    NOT?: ProductDiscountPriceScalarWhereInput | ProductDiscountPriceScalarWhereInput[]
    id?: StringFilter<"ProductDiscountPrice"> | string
    productId?: StringFilter<"ProductDiscountPrice"> | string
    discountId?: StringFilter<"ProductDiscountPrice"> | string
    discountPrice?: FloatFilter<"ProductDiscountPrice"> | number
    createdAt?: DateTimeFilter<"ProductDiscountPrice"> | Date | string
    updatedAt?: DateTimeFilter<"ProductDiscountPrice"> | Date | string
  }

  export type ProductWeightDiscountUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductWeightDiscountWhereUniqueInput
    update: XOR<ProductWeightDiscountUpdateWithoutProductInput, ProductWeightDiscountUncheckedUpdateWithoutProductInput>
    create: XOR<ProductWeightDiscountCreateWithoutProductInput, ProductWeightDiscountUncheckedCreateWithoutProductInput>
  }

  export type ProductWeightDiscountUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductWeightDiscountWhereUniqueInput
    data: XOR<ProductWeightDiscountUpdateWithoutProductInput, ProductWeightDiscountUncheckedUpdateWithoutProductInput>
  }

  export type ProductWeightDiscountUpdateManyWithWhereWithoutProductInput = {
    where: ProductWeightDiscountScalarWhereInput
    data: XOR<ProductWeightDiscountUpdateManyMutationInput, ProductWeightDiscountUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductWeightDiscountScalarWhereInput = {
    AND?: ProductWeightDiscountScalarWhereInput | ProductWeightDiscountScalarWhereInput[]
    OR?: ProductWeightDiscountScalarWhereInput[]
    NOT?: ProductWeightDiscountScalarWhereInput | ProductWeightDiscountScalarWhereInput[]
    id?: StringFilter<"ProductWeightDiscount"> | string
    productId?: StringFilter<"ProductWeightDiscount"> | string
    minWeight?: FloatFilter<"ProductWeightDiscount"> | number
    price?: FloatFilter<"ProductWeightDiscount"> | number
    createdAt?: DateTimeFilter<"ProductWeightDiscount"> | Date | string
    updatedAt?: DateTimeFilter<"ProductWeightDiscount"> | Date | string
  }

  export type ProductNutritionUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductNutritionWhereUniqueInput
    update: XOR<ProductNutritionUpdateWithoutProductInput, ProductNutritionUncheckedUpdateWithoutProductInput>
    create: XOR<ProductNutritionCreateWithoutProductInput, ProductNutritionUncheckedCreateWithoutProductInput>
  }

  export type ProductNutritionUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductNutritionWhereUniqueInput
    data: XOR<ProductNutritionUpdateWithoutProductInput, ProductNutritionUncheckedUpdateWithoutProductInput>
  }

  export type ProductNutritionUpdateManyWithWhereWithoutProductInput = {
    where: ProductNutritionScalarWhereInput
    data: XOR<ProductNutritionUpdateManyMutationInput, ProductNutritionUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductNutritionScalarWhereInput = {
    AND?: ProductNutritionScalarWhereInput | ProductNutritionScalarWhereInput[]
    OR?: ProductNutritionScalarWhereInput[]
    NOT?: ProductNutritionScalarWhereInput | ProductNutritionScalarWhereInput[]
    id?: StringFilter<"ProductNutrition"> | string
    productId?: StringFilter<"ProductNutrition"> | string
    name?: StringFilter<"ProductNutrition"> | string
    grams?: FloatFilter<"ProductNutrition"> | number
    createdAt?: DateTimeFilter<"ProductNutrition"> | Date | string
    updatedAt?: DateTimeFilter<"ProductNutrition"> | Date | string
  }

  export type CategoryCreateWithoutWeightDiscountsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutWeightDiscountsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutWeightDiscountsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutWeightDiscountsInput, CategoryUncheckedCreateWithoutWeightDiscountsInput>
  }

  export type ProductDiscountPriceCreateWithoutDiscountInput = {
    id?: string
    discountPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutDiscountPricesInput
  }

  export type ProductDiscountPriceUncheckedCreateWithoutDiscountInput = {
    id?: string
    productId: string
    discountPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductDiscountPriceCreateOrConnectWithoutDiscountInput = {
    where: ProductDiscountPriceWhereUniqueInput
    create: XOR<ProductDiscountPriceCreateWithoutDiscountInput, ProductDiscountPriceUncheckedCreateWithoutDiscountInput>
  }

  export type ProductDiscountPriceCreateManyDiscountInputEnvelope = {
    data: ProductDiscountPriceCreateManyDiscountInput | ProductDiscountPriceCreateManyDiscountInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutWeightDiscountsInput = {
    update: XOR<CategoryUpdateWithoutWeightDiscountsInput, CategoryUncheckedUpdateWithoutWeightDiscountsInput>
    create: XOR<CategoryCreateWithoutWeightDiscountsInput, CategoryUncheckedCreateWithoutWeightDiscountsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutWeightDiscountsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutWeightDiscountsInput, CategoryUncheckedUpdateWithoutWeightDiscountsInput>
  }

  export type CategoryUpdateWithoutWeightDiscountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutWeightDiscountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ProductDiscountPriceUpsertWithWhereUniqueWithoutDiscountInput = {
    where: ProductDiscountPriceWhereUniqueInput
    update: XOR<ProductDiscountPriceUpdateWithoutDiscountInput, ProductDiscountPriceUncheckedUpdateWithoutDiscountInput>
    create: XOR<ProductDiscountPriceCreateWithoutDiscountInput, ProductDiscountPriceUncheckedCreateWithoutDiscountInput>
  }

  export type ProductDiscountPriceUpdateWithWhereUniqueWithoutDiscountInput = {
    where: ProductDiscountPriceWhereUniqueInput
    data: XOR<ProductDiscountPriceUpdateWithoutDiscountInput, ProductDiscountPriceUncheckedUpdateWithoutDiscountInput>
  }

  export type ProductDiscountPriceUpdateManyWithWhereWithoutDiscountInput = {
    where: ProductDiscountPriceScalarWhereInput
    data: XOR<ProductDiscountPriceUpdateManyMutationInput, ProductDiscountPriceUncheckedUpdateManyWithoutDiscountInput>
  }

  export type ProductCreateWithoutDiscountPricesInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    price: number
    regularPrice?: number | null
    length?: number | null
    breadth?: number | null
    height?: number | null
    weight?: number | null
    packingWeight?: number | null
    tax: number
    hsnsac?: string | null
    mainImage?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: boolean
    approved: boolean
    webVisible?: boolean
    stockCount?: number | null
    vegetable?: boolean
    veg?: boolean
    frozen?: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy: string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    category: CategoryCreateNestedOneWithoutProductsInput
    weightDiscounts?: ProductWeightDiscountCreateNestedManyWithoutProductInput
    nutrition?: ProductNutritionCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutDiscountPricesInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    price: number
    regularPrice?: number | null
    length?: number | null
    breadth?: number | null
    height?: number | null
    weight?: number | null
    packingWeight?: number | null
    tax: number
    hsnsac?: string | null
    mainImage?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: boolean
    approved: boolean
    webVisible?: boolean
    stockCount?: number | null
    vegetable?: boolean
    veg?: boolean
    frozen?: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy: string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    categoryId: string
    weightDiscounts?: ProductWeightDiscountUncheckedCreateNestedManyWithoutProductInput
    nutrition?: ProductNutritionUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutDiscountPricesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutDiscountPricesInput, ProductUncheckedCreateWithoutDiscountPricesInput>
  }

  export type CategoryWeightDiscountCreateWithoutProductDiscountsInput = {
    id?: string
    minWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutWeightDiscountsInput
  }

  export type CategoryWeightDiscountUncheckedCreateWithoutProductDiscountsInput = {
    id?: string
    minWeight: number
    categoryId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryWeightDiscountCreateOrConnectWithoutProductDiscountsInput = {
    where: CategoryWeightDiscountWhereUniqueInput
    create: XOR<CategoryWeightDiscountCreateWithoutProductDiscountsInput, CategoryWeightDiscountUncheckedCreateWithoutProductDiscountsInput>
  }

  export type ProductUpsertWithoutDiscountPricesInput = {
    update: XOR<ProductUpdateWithoutDiscountPricesInput, ProductUncheckedUpdateWithoutDiscountPricesInput>
    create: XOR<ProductCreateWithoutDiscountPricesInput, ProductUncheckedCreateWithoutDiscountPricesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutDiscountPricesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutDiscountPricesInput, ProductUncheckedUpdateWithoutDiscountPricesInput>
  }

  export type ProductUpdateWithoutDiscountPricesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    regularPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    breadth?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    packingWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    tax?: IntFieldUpdateOperationsInput | number
    hsnsac?: NullableStringFieldUpdateOperationsInput | string | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    webVisible?: BoolFieldUpdateOperationsInput | boolean
    stockCount?: NullableIntFieldUpdateOperationsInput | number | null
    vegetable?: BoolFieldUpdateOperationsInput | boolean
    veg?: BoolFieldUpdateOperationsInput | boolean
    frozen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    weightDiscounts?: ProductWeightDiscountUpdateManyWithoutProductNestedInput
    nutrition?: ProductNutritionUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutDiscountPricesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    regularPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    breadth?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    packingWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    tax?: IntFieldUpdateOperationsInput | number
    hsnsac?: NullableStringFieldUpdateOperationsInput | string | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    webVisible?: BoolFieldUpdateOperationsInput | boolean
    stockCount?: NullableIntFieldUpdateOperationsInput | number | null
    vegetable?: BoolFieldUpdateOperationsInput | boolean
    veg?: BoolFieldUpdateOperationsInput | boolean
    frozen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    weightDiscounts?: ProductWeightDiscountUncheckedUpdateManyWithoutProductNestedInput
    nutrition?: ProductNutritionUncheckedUpdateManyWithoutProductNestedInput
  }

  export type CategoryWeightDiscountUpsertWithoutProductDiscountsInput = {
    update: XOR<CategoryWeightDiscountUpdateWithoutProductDiscountsInput, CategoryWeightDiscountUncheckedUpdateWithoutProductDiscountsInput>
    create: XOR<CategoryWeightDiscountCreateWithoutProductDiscountsInput, CategoryWeightDiscountUncheckedCreateWithoutProductDiscountsInput>
    where?: CategoryWeightDiscountWhereInput
  }

  export type CategoryWeightDiscountUpdateToOneWithWhereWithoutProductDiscountsInput = {
    where?: CategoryWeightDiscountWhereInput
    data: XOR<CategoryWeightDiscountUpdateWithoutProductDiscountsInput, CategoryWeightDiscountUncheckedUpdateWithoutProductDiscountsInput>
  }

  export type CategoryWeightDiscountUpdateWithoutProductDiscountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    minWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutWeightDiscountsNestedInput
  }

  export type CategoryWeightDiscountUncheckedUpdateWithoutProductDiscountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    minWeight?: FloatFieldUpdateOperationsInput | number
    categoryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateWithoutWeightDiscountsInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    price: number
    regularPrice?: number | null
    length?: number | null
    breadth?: number | null
    height?: number | null
    weight?: number | null
    packingWeight?: number | null
    tax: number
    hsnsac?: string | null
    mainImage?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: boolean
    approved: boolean
    webVisible?: boolean
    stockCount?: number | null
    vegetable?: boolean
    veg?: boolean
    frozen?: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy: string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    category: CategoryCreateNestedOneWithoutProductsInput
    discountPrices?: ProductDiscountPriceCreateNestedManyWithoutProductInput
    nutrition?: ProductNutritionCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutWeightDiscountsInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    price: number
    regularPrice?: number | null
    length?: number | null
    breadth?: number | null
    height?: number | null
    weight?: number | null
    packingWeight?: number | null
    tax: number
    hsnsac?: string | null
    mainImage?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: boolean
    approved: boolean
    webVisible?: boolean
    stockCount?: number | null
    vegetable?: boolean
    veg?: boolean
    frozen?: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy: string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    categoryId: string
    discountPrices?: ProductDiscountPriceUncheckedCreateNestedManyWithoutProductInput
    nutrition?: ProductNutritionUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutWeightDiscountsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutWeightDiscountsInput, ProductUncheckedCreateWithoutWeightDiscountsInput>
  }

  export type ProductUpsertWithoutWeightDiscountsInput = {
    update: XOR<ProductUpdateWithoutWeightDiscountsInput, ProductUncheckedUpdateWithoutWeightDiscountsInput>
    create: XOR<ProductCreateWithoutWeightDiscountsInput, ProductUncheckedCreateWithoutWeightDiscountsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutWeightDiscountsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutWeightDiscountsInput, ProductUncheckedUpdateWithoutWeightDiscountsInput>
  }

  export type ProductUpdateWithoutWeightDiscountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    regularPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    breadth?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    packingWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    tax?: IntFieldUpdateOperationsInput | number
    hsnsac?: NullableStringFieldUpdateOperationsInput | string | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    webVisible?: BoolFieldUpdateOperationsInput | boolean
    stockCount?: NullableIntFieldUpdateOperationsInput | number | null
    vegetable?: BoolFieldUpdateOperationsInput | boolean
    veg?: BoolFieldUpdateOperationsInput | boolean
    frozen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    discountPrices?: ProductDiscountPriceUpdateManyWithoutProductNestedInput
    nutrition?: ProductNutritionUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutWeightDiscountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    regularPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    breadth?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    packingWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    tax?: IntFieldUpdateOperationsInput | number
    hsnsac?: NullableStringFieldUpdateOperationsInput | string | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    webVisible?: BoolFieldUpdateOperationsInput | boolean
    stockCount?: NullableIntFieldUpdateOperationsInput | number | null
    vegetable?: BoolFieldUpdateOperationsInput | boolean
    veg?: BoolFieldUpdateOperationsInput | boolean
    frozen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    discountPrices?: ProductDiscountPriceUncheckedUpdateManyWithoutProductNestedInput
    nutrition?: ProductNutritionUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateWithoutNutritionInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    price: number
    regularPrice?: number | null
    length?: number | null
    breadth?: number | null
    height?: number | null
    weight?: number | null
    packingWeight?: number | null
    tax: number
    hsnsac?: string | null
    mainImage?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: boolean
    approved: boolean
    webVisible?: boolean
    stockCount?: number | null
    vegetable?: boolean
    veg?: boolean
    frozen?: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy: string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    category: CategoryCreateNestedOneWithoutProductsInput
    discountPrices?: ProductDiscountPriceCreateNestedManyWithoutProductInput
    weightDiscounts?: ProductWeightDiscountCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutNutritionInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    price: number
    regularPrice?: number | null
    length?: number | null
    breadth?: number | null
    height?: number | null
    weight?: number | null
    packingWeight?: number | null
    tax: number
    hsnsac?: string | null
    mainImage?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: boolean
    approved: boolean
    webVisible?: boolean
    stockCount?: number | null
    vegetable?: boolean
    veg?: boolean
    frozen?: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy: string
    approvedAt?: Date | string | null
    approvedBy?: string | null
    categoryId: string
    discountPrices?: ProductDiscountPriceUncheckedCreateNestedManyWithoutProductInput
    weightDiscounts?: ProductWeightDiscountUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutNutritionInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutNutritionInput, ProductUncheckedCreateWithoutNutritionInput>
  }

  export type ProductUpsertWithoutNutritionInput = {
    update: XOR<ProductUpdateWithoutNutritionInput, ProductUncheckedUpdateWithoutNutritionInput>
    create: XOR<ProductCreateWithoutNutritionInput, ProductUncheckedCreateWithoutNutritionInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutNutritionInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutNutritionInput, ProductUncheckedUpdateWithoutNutritionInput>
  }

  export type ProductUpdateWithoutNutritionInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    regularPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    breadth?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    packingWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    tax?: IntFieldUpdateOperationsInput | number
    hsnsac?: NullableStringFieldUpdateOperationsInput | string | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    webVisible?: BoolFieldUpdateOperationsInput | boolean
    stockCount?: NullableIntFieldUpdateOperationsInput | number | null
    vegetable?: BoolFieldUpdateOperationsInput | boolean
    veg?: BoolFieldUpdateOperationsInput | boolean
    frozen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    discountPrices?: ProductDiscountPriceUpdateManyWithoutProductNestedInput
    weightDiscounts?: ProductWeightDiscountUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutNutritionInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    regularPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    breadth?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    packingWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    tax?: IntFieldUpdateOperationsInput | number
    hsnsac?: NullableStringFieldUpdateOperationsInput | string | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    webVisible?: BoolFieldUpdateOperationsInput | boolean
    stockCount?: NullableIntFieldUpdateOperationsInput | number | null
    vegetable?: BoolFieldUpdateOperationsInput | boolean
    veg?: BoolFieldUpdateOperationsInput | boolean
    frozen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    discountPrices?: ProductDiscountPriceUncheckedUpdateManyWithoutProductNestedInput
    weightDiscounts?: ProductWeightDiscountUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyCategoryInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    price: number
    regularPrice?: number | null
    length?: number | null
    breadth?: number | null
    height?: number | null
    weight?: number | null
    packingWeight?: number | null
    tax: number
    hsnsac?: string | null
    mainImage?: string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: boolean
    approved: boolean
    webVisible?: boolean
    stockCount?: number | null
    vegetable?: boolean
    veg?: boolean
    frozen?: boolean
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy: string
    approvedAt?: Date | string | null
    approvedBy?: string | null
  }

  export type CategoryWeightDiscountCreateManyCategoryInput = {
    id?: string
    minWeight: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    regularPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    breadth?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    packingWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    tax?: IntFieldUpdateOperationsInput | number
    hsnsac?: NullableStringFieldUpdateOperationsInput | string | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    webVisible?: BoolFieldUpdateOperationsInput | boolean
    stockCount?: NullableIntFieldUpdateOperationsInput | number | null
    vegetable?: BoolFieldUpdateOperationsInput | boolean
    veg?: BoolFieldUpdateOperationsInput | boolean
    frozen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    discountPrices?: ProductDiscountPriceUpdateManyWithoutProductNestedInput
    weightDiscounts?: ProductWeightDiscountUpdateManyWithoutProductNestedInput
    nutrition?: ProductNutritionUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    regularPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    breadth?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    packingWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    tax?: IntFieldUpdateOperationsInput | number
    hsnsac?: NullableStringFieldUpdateOperationsInput | string | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    webVisible?: BoolFieldUpdateOperationsInput | boolean
    stockCount?: NullableIntFieldUpdateOperationsInput | number | null
    vegetable?: BoolFieldUpdateOperationsInput | boolean
    veg?: BoolFieldUpdateOperationsInput | boolean
    frozen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    discountPrices?: ProductDiscountPriceUncheckedUpdateManyWithoutProductNestedInput
    weightDiscounts?: ProductWeightDiscountUncheckedUpdateManyWithoutProductNestedInput
    nutrition?: ProductNutritionUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    regularPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    length?: NullableFloatFieldUpdateOperationsInput | number | null
    breadth?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    packingWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    tax?: IntFieldUpdateOperationsInput | number
    hsnsac?: NullableStringFieldUpdateOperationsInput | string | null
    mainImage?: NullableStringFieldUpdateOperationsInput | string | null
    images?: NullableJsonNullValueInput | InputJsonValue
    inStock?: BoolFieldUpdateOperationsInput | boolean
    approved?: BoolFieldUpdateOperationsInput | boolean
    webVisible?: BoolFieldUpdateOperationsInput | boolean
    stockCount?: NullableIntFieldUpdateOperationsInput | number | null
    vegetable?: BoolFieldUpdateOperationsInput | boolean
    veg?: BoolFieldUpdateOperationsInput | boolean
    frozen?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CategoryWeightDiscountUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    minWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productDiscounts?: ProductDiscountPriceUpdateManyWithoutDiscountNestedInput
  }

  export type CategoryWeightDiscountUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    minWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productDiscounts?: ProductDiscountPriceUncheckedUpdateManyWithoutDiscountNestedInput
  }

  export type CategoryWeightDiscountUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    minWeight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductDiscountPriceCreateManyProductInput = {
    id?: string
    discountId: string
    discountPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductWeightDiscountCreateManyProductInput = {
    id?: string
    minWeight: number
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductNutritionCreateManyProductInput = {
    id?: string
    name: string
    grams: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductDiscountPriceUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    discountPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    discount?: CategoryWeightDiscountUpdateOneRequiredWithoutProductDiscountsNestedInput
  }

  export type ProductDiscountPriceUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    discountId?: StringFieldUpdateOperationsInput | string
    discountPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductDiscountPriceUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    discountId?: StringFieldUpdateOperationsInput | string
    discountPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductWeightDiscountUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    minWeight?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductWeightDiscountUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    minWeight?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductWeightDiscountUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    minWeight?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductNutritionUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grams?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductNutritionUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grams?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductNutritionUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    grams?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductDiscountPriceCreateManyDiscountInput = {
    id?: string
    productId: string
    discountPrice: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductDiscountPriceUpdateWithoutDiscountInput = {
    id?: StringFieldUpdateOperationsInput | string
    discountPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutDiscountPricesNestedInput
  }

  export type ProductDiscountPriceUncheckedUpdateWithoutDiscountInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    discountPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductDiscountPriceUncheckedUpdateManyWithoutDiscountInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    discountPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}