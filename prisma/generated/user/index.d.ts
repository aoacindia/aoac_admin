
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model OtpVerification
 * 
 */
export type OtpVerification = $Result.DefaultSelection<Prisma.$OtpVerificationPayload>
/**
 * Model Cart
 * 
 */
export type Cart = $Result.DefaultSelection<Prisma.$CartPayload>
/**
 * Model BulkCart
 * 
 */
export type BulkCart = $Result.DefaultSelection<Prisma.$BulkCartPayload>
/**
 * Model Address
 * 
 */
export type Address = $Result.DefaultSelection<Prisma.$AddressPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model PasswordReset
 * 
 */
export type PasswordReset = $Result.DefaultSelection<Prisma.$PasswordResetPayload>
/**
 * Model Contact
 * 
 */
export type Contact = $Result.DefaultSelection<Prisma.$ContactPayload>
/**
 * Model Feedback
 * 
 */
export type Feedback = $Result.DefaultSelection<Prisma.$FeedbackPayload>
/**
 * Model Announcement
 * 
 */
export type Announcement = $Result.DefaultSelection<Prisma.$AnnouncementPayload>
/**
 * Model PopupAnnouncement
 * 
 */
export type PopupAnnouncement = $Result.DefaultSelection<Prisma.$PopupAnnouncementPayload>
/**
 * Model SuspensionReason
 * 
 */
export type SuspensionReason = $Result.DefaultSelection<Prisma.$SuspensionReasonPayload>
/**
 * Model BillingAddress
 * 
 */
export type BillingAddress = $Result.DefaultSelection<Prisma.$BillingAddressPayload>
/**
 * Model Supplier
 * 
 */
export type Supplier = $Result.DefaultSelection<Prisma.$SupplierPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OrderStatus: {
  PENDING: 'PENDING',
  ORDER_READY: 'ORDER_READY',
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  PAID: 'PAID',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

}

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otpVerification`: Exposes CRUD operations for the **OtpVerification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OtpVerifications
    * const otpVerifications = await prisma.otpVerification.findMany()
    * ```
    */
  get otpVerification(): Prisma.OtpVerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cart`: Exposes CRUD operations for the **Cart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Carts
    * const carts = await prisma.cart.findMany()
    * ```
    */
  get cart(): Prisma.CartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bulkCart`: Exposes CRUD operations for the **BulkCart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BulkCarts
    * const bulkCarts = await prisma.bulkCart.findMany()
    * ```
    */
  get bulkCart(): Prisma.BulkCartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.address`: Exposes CRUD operations for the **Address** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Addresses
    * const addresses = await prisma.address.findMany()
    * ```
    */
  get address(): Prisma.AddressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordReset`: Exposes CRUD operations for the **PasswordReset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResets
    * const passwordResets = await prisma.passwordReset.findMany()
    * ```
    */
  get passwordReset(): Prisma.PasswordResetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contact`: Exposes CRUD operations for the **Contact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contacts
    * const contacts = await prisma.contact.findMany()
    * ```
    */
  get contact(): Prisma.ContactDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feedback`: Exposes CRUD operations for the **Feedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Feedbacks
    * const feedbacks = await prisma.feedback.findMany()
    * ```
    */
  get feedback(): Prisma.FeedbackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.announcement`: Exposes CRUD operations for the **Announcement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Announcements
    * const announcements = await prisma.announcement.findMany()
    * ```
    */
  get announcement(): Prisma.AnnouncementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.popupAnnouncement`: Exposes CRUD operations for the **PopupAnnouncement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PopupAnnouncements
    * const popupAnnouncements = await prisma.popupAnnouncement.findMany()
    * ```
    */
  get popupAnnouncement(): Prisma.PopupAnnouncementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.suspensionReason`: Exposes CRUD operations for the **SuspensionReason** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SuspensionReasons
    * const suspensionReasons = await prisma.suspensionReason.findMany()
    * ```
    */
  get suspensionReason(): Prisma.SuspensionReasonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.billingAddress`: Exposes CRUD operations for the **BillingAddress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BillingAddresses
    * const billingAddresses = await prisma.billingAddress.findMany()
    * ```
    */
  get billingAddress(): Prisma.BillingAddressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.supplier`: Exposes CRUD operations for the **Supplier** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Suppliers
    * const suppliers = await prisma.supplier.findMany()
    * ```
    */
  get supplier(): Prisma.SupplierDelegate<ExtArgs, ClientOptions>;
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
    User: 'User',
    OtpVerification: 'OtpVerification',
    Cart: 'Cart',
    BulkCart: 'BulkCart',
    Address: 'Address',
    Order: 'Order',
    OrderItem: 'OrderItem',
    PasswordReset: 'PasswordReset',
    Contact: 'Contact',
    Feedback: 'Feedback',
    Announcement: 'Announcement',
    PopupAnnouncement: 'PopupAnnouncement',
    SuspensionReason: 'SuspensionReason',
    BillingAddress: 'BillingAddress',
    Supplier: 'Supplier'
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
      modelProps: "user" | "otpVerification" | "cart" | "bulkCart" | "address" | "order" | "orderItem" | "passwordReset" | "contact" | "feedback" | "announcement" | "popupAnnouncement" | "suspensionReason" | "billingAddress" | "supplier"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      OtpVerification: {
        payload: Prisma.$OtpVerificationPayload<ExtArgs>
        fields: Prisma.OtpVerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OtpVerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OtpVerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload>
          }
          findFirst: {
            args: Prisma.OtpVerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OtpVerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload>
          }
          findMany: {
            args: Prisma.OtpVerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload>[]
          }
          create: {
            args: Prisma.OtpVerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload>
          }
          createMany: {
            args: Prisma.OtpVerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OtpVerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload>
          }
          update: {
            args: Prisma.OtpVerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload>
          }
          deleteMany: {
            args: Prisma.OtpVerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OtpVerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OtpVerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload>
          }
          aggregate: {
            args: Prisma.OtpVerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtpVerification>
          }
          groupBy: {
            args: Prisma.OtpVerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtpVerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OtpVerificationCountArgs<ExtArgs>
            result: $Utils.Optional<OtpVerificationCountAggregateOutputType> | number
          }
        }
      }
      Cart: {
        payload: Prisma.$CartPayload<ExtArgs>
        fields: Prisma.CartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          findFirst: {
            args: Prisma.CartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          findMany: {
            args: Prisma.CartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>[]
          }
          create: {
            args: Prisma.CartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          createMany: {
            args: Prisma.CartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          update: {
            args: Prisma.CartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          deleteMany: {
            args: Prisma.CartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CartPayload>
          }
          aggregate: {
            args: Prisma.CartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCart>
          }
          groupBy: {
            args: Prisma.CartGroupByArgs<ExtArgs>
            result: $Utils.Optional<CartGroupByOutputType>[]
          }
          count: {
            args: Prisma.CartCountArgs<ExtArgs>
            result: $Utils.Optional<CartCountAggregateOutputType> | number
          }
        }
      }
      BulkCart: {
        payload: Prisma.$BulkCartPayload<ExtArgs>
        fields: Prisma.BulkCartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BulkCartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BulkCartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BulkCartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BulkCartPayload>
          }
          findFirst: {
            args: Prisma.BulkCartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BulkCartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BulkCartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BulkCartPayload>
          }
          findMany: {
            args: Prisma.BulkCartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BulkCartPayload>[]
          }
          create: {
            args: Prisma.BulkCartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BulkCartPayload>
          }
          createMany: {
            args: Prisma.BulkCartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BulkCartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BulkCartPayload>
          }
          update: {
            args: Prisma.BulkCartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BulkCartPayload>
          }
          deleteMany: {
            args: Prisma.BulkCartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BulkCartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BulkCartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BulkCartPayload>
          }
          aggregate: {
            args: Prisma.BulkCartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBulkCart>
          }
          groupBy: {
            args: Prisma.BulkCartGroupByArgs<ExtArgs>
            result: $Utils.Optional<BulkCartGroupByOutputType>[]
          }
          count: {
            args: Prisma.BulkCartCountArgs<ExtArgs>
            result: $Utils.Optional<BulkCartCountAggregateOutputType> | number
          }
        }
      }
      Address: {
        payload: Prisma.$AddressPayload<ExtArgs>
        fields: Prisma.AddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findFirst: {
            args: Prisma.AddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findMany: {
            args: Prisma.AddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          create: {
            args: Prisma.AddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          createMany: {
            args: Prisma.AddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          update: {
            args: Prisma.AddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          deleteMany: {
            args: Prisma.AddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          aggregate: {
            args: Prisma.AddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddress>
          }
          groupBy: {
            args: Prisma.AddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressCountArgs<ExtArgs>
            result: $Utils.Optional<AddressCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      PasswordReset: {
        payload: Prisma.$PasswordResetPayload<ExtArgs>
        fields: Prisma.PasswordResetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          findMany: {
            args: Prisma.PasswordResetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>[]
          }
          create: {
            args: Prisma.PasswordResetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          createMany: {
            args: Prisma.PasswordResetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PasswordResetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          update: {
            args: Prisma.PasswordResetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PasswordResetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordReset>
          }
          groupBy: {
            args: Prisma.PasswordResetGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetCountAggregateOutputType> | number
          }
        }
      }
      Contact: {
        payload: Prisma.$ContactPayload<ExtArgs>
        fields: Prisma.ContactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findFirst: {
            args: Prisma.ContactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findMany: {
            args: Prisma.ContactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          create: {
            args: Prisma.ContactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          createMany: {
            args: Prisma.ContactCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ContactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          update: {
            args: Prisma.ContactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          deleteMany: {
            args: Prisma.ContactDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          aggregate: {
            args: Prisma.ContactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContact>
          }
          groupBy: {
            args: Prisma.ContactGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactCountArgs<ExtArgs>
            result: $Utils.Optional<ContactCountAggregateOutputType> | number
          }
        }
      }
      Feedback: {
        payload: Prisma.$FeedbackPayload<ExtArgs>
        fields: Prisma.FeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findFirst: {
            args: Prisma.FeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          findMany: {
            args: Prisma.FeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>[]
          }
          create: {
            args: Prisma.FeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          createMany: {
            args: Prisma.FeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          update: {
            args: Prisma.FeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          deleteMany: {
            args: Prisma.FeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackPayload>
          }
          aggregate: {
            args: Prisma.FeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedback>
          }
          groupBy: {
            args: Prisma.FeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<FeedbackCountAggregateOutputType> | number
          }
        }
      }
      Announcement: {
        payload: Prisma.$AnnouncementPayload<ExtArgs>
        fields: Prisma.AnnouncementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnnouncementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnnouncementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          findFirst: {
            args: Prisma.AnnouncementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnnouncementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          findMany: {
            args: Prisma.AnnouncementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>[]
          }
          create: {
            args: Prisma.AnnouncementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          createMany: {
            args: Prisma.AnnouncementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AnnouncementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          update: {
            args: Prisma.AnnouncementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          deleteMany: {
            args: Prisma.AnnouncementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnnouncementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AnnouncementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnnouncementPayload>
          }
          aggregate: {
            args: Prisma.AnnouncementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnnouncement>
          }
          groupBy: {
            args: Prisma.AnnouncementGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnnouncementCountArgs<ExtArgs>
            result: $Utils.Optional<AnnouncementCountAggregateOutputType> | number
          }
        }
      }
      PopupAnnouncement: {
        payload: Prisma.$PopupAnnouncementPayload<ExtArgs>
        fields: Prisma.PopupAnnouncementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PopupAnnouncementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopupAnnouncementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PopupAnnouncementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopupAnnouncementPayload>
          }
          findFirst: {
            args: Prisma.PopupAnnouncementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopupAnnouncementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PopupAnnouncementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopupAnnouncementPayload>
          }
          findMany: {
            args: Prisma.PopupAnnouncementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopupAnnouncementPayload>[]
          }
          create: {
            args: Prisma.PopupAnnouncementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopupAnnouncementPayload>
          }
          createMany: {
            args: Prisma.PopupAnnouncementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PopupAnnouncementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopupAnnouncementPayload>
          }
          update: {
            args: Prisma.PopupAnnouncementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopupAnnouncementPayload>
          }
          deleteMany: {
            args: Prisma.PopupAnnouncementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PopupAnnouncementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PopupAnnouncementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PopupAnnouncementPayload>
          }
          aggregate: {
            args: Prisma.PopupAnnouncementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePopupAnnouncement>
          }
          groupBy: {
            args: Prisma.PopupAnnouncementGroupByArgs<ExtArgs>
            result: $Utils.Optional<PopupAnnouncementGroupByOutputType>[]
          }
          count: {
            args: Prisma.PopupAnnouncementCountArgs<ExtArgs>
            result: $Utils.Optional<PopupAnnouncementCountAggregateOutputType> | number
          }
        }
      }
      SuspensionReason: {
        payload: Prisma.$SuspensionReasonPayload<ExtArgs>
        fields: Prisma.SuspensionReasonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SuspensionReasonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuspensionReasonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SuspensionReasonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuspensionReasonPayload>
          }
          findFirst: {
            args: Prisma.SuspensionReasonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuspensionReasonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SuspensionReasonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuspensionReasonPayload>
          }
          findMany: {
            args: Prisma.SuspensionReasonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuspensionReasonPayload>[]
          }
          create: {
            args: Prisma.SuspensionReasonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuspensionReasonPayload>
          }
          createMany: {
            args: Prisma.SuspensionReasonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SuspensionReasonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuspensionReasonPayload>
          }
          update: {
            args: Prisma.SuspensionReasonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuspensionReasonPayload>
          }
          deleteMany: {
            args: Prisma.SuspensionReasonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SuspensionReasonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SuspensionReasonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuspensionReasonPayload>
          }
          aggregate: {
            args: Prisma.SuspensionReasonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSuspensionReason>
          }
          groupBy: {
            args: Prisma.SuspensionReasonGroupByArgs<ExtArgs>
            result: $Utils.Optional<SuspensionReasonGroupByOutputType>[]
          }
          count: {
            args: Prisma.SuspensionReasonCountArgs<ExtArgs>
            result: $Utils.Optional<SuspensionReasonCountAggregateOutputType> | number
          }
        }
      }
      BillingAddress: {
        payload: Prisma.$BillingAddressPayload<ExtArgs>
        fields: Prisma.BillingAddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BillingAddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingAddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BillingAddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingAddressPayload>
          }
          findFirst: {
            args: Prisma.BillingAddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingAddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BillingAddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingAddressPayload>
          }
          findMany: {
            args: Prisma.BillingAddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingAddressPayload>[]
          }
          create: {
            args: Prisma.BillingAddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingAddressPayload>
          }
          createMany: {
            args: Prisma.BillingAddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BillingAddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingAddressPayload>
          }
          update: {
            args: Prisma.BillingAddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingAddressPayload>
          }
          deleteMany: {
            args: Prisma.BillingAddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BillingAddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BillingAddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingAddressPayload>
          }
          aggregate: {
            args: Prisma.BillingAddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBillingAddress>
          }
          groupBy: {
            args: Prisma.BillingAddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<BillingAddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.BillingAddressCountArgs<ExtArgs>
            result: $Utils.Optional<BillingAddressCountAggregateOutputType> | number
          }
        }
      }
      Supplier: {
        payload: Prisma.$SupplierPayload<ExtArgs>
        fields: Prisma.SupplierFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupplierFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupplierFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findFirst: {
            args: Prisma.SupplierFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupplierFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findMany: {
            args: Prisma.SupplierFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>[]
          }
          create: {
            args: Prisma.SupplierCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          createMany: {
            args: Prisma.SupplierCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SupplierDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          update: {
            args: Prisma.SupplierUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          deleteMany: {
            args: Prisma.SupplierDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupplierUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SupplierUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          aggregate: {
            args: Prisma.SupplierAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupplier>
          }
          groupBy: {
            args: Prisma.SupplierGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupplierGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupplierCountArgs<ExtArgs>
            result: $Utils.Optional<SupplierCountAggregateOutputType> | number
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
    user?: UserOmit
    otpVerification?: OtpVerificationOmit
    cart?: CartOmit
    bulkCart?: BulkCartOmit
    address?: AddressOmit
    order?: OrderOmit
    orderItem?: OrderItemOmit
    passwordReset?: PasswordResetOmit
    contact?: ContactOmit
    feedback?: FeedbackOmit
    announcement?: AnnouncementOmit
    popupAnnouncement?: PopupAnnouncementOmit
    suspensionReason?: SuspensionReasonOmit
    billingAddress?: BillingAddressOmit
    supplier?: SupplierOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    cart: number
    bulkCart: number
    addresses: number
    order: number
    passwordReset: number
    suspensionReasons: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cart?: boolean | UserCountOutputTypeCountCartArgs
    bulkCart?: boolean | UserCountOutputTypeCountBulkCartArgs
    addresses?: boolean | UserCountOutputTypeCountAddressesArgs
    order?: boolean | UserCountOutputTypeCountOrderArgs
    passwordReset?: boolean | UserCountOutputTypeCountPasswordResetArgs
    suspensionReasons?: boolean | UserCountOutputTypeCountSuspensionReasonsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBulkCartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BulkCartWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPasswordResetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSuspensionReasonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SuspensionReasonWhereInput
  }


  /**
   * Count Type AddressCountOutputType
   */

  export type AddressCountOutputType = {
    orders: number
  }

  export type AddressCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | AddressCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * AddressCountOutputType without action
   */
  export type AddressCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressCountOutputType
     */
    select?: AddressCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AddressCountOutputType without action
   */
  export type AddressCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    orderItems: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderItems?: boolean | OrderCountOutputTypeCountOrderItemsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountOrderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Count Type SupplierCountOutputType
   */

  export type SupplierCountOutputType = {
    orders: number
  }

  export type SupplierCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | SupplierCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierCountOutputType
     */
    select?: SupplierCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    suspended_number: number | null
  }

  export type UserSumAggregateOutputType = {
    suspended_number: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    suspended: boolean | null
    suspended_number: number | null
    terminated: boolean | null
    isBusinessAccount: boolean | null
    businessName: string | null
    gstNumber: string | null
    hasAdditionalTradeName: boolean | null
    additionalTradeName: string | null
    phone: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    suspended: boolean | null
    suspended_number: number | null
    terminated: boolean | null
    isBusinessAccount: boolean | null
    businessName: string | null
    gstNumber: string | null
    hasAdditionalTradeName: boolean | null
    additionalTradeName: string | null
    phone: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    suspended: number
    suspended_number: number
    terminated: number
    isBusinessAccount: number
    businessName: number
    gstNumber: number
    hasAdditionalTradeName: number
    additionalTradeName: number
    phone: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    suspended_number?: true
  }

  export type UserSumAggregateInputType = {
    suspended_number?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    suspended?: true
    suspended_number?: true
    terminated?: true
    isBusinessAccount?: true
    businessName?: true
    gstNumber?: true
    hasAdditionalTradeName?: true
    additionalTradeName?: true
    phone?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    suspended?: true
    suspended_number?: true
    terminated?: true
    isBusinessAccount?: true
    businessName?: true
    gstNumber?: true
    hasAdditionalTradeName?: true
    additionalTradeName?: true
    phone?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    suspended?: true
    suspended_number?: true
    terminated?: true
    isBusinessAccount?: true
    businessName?: true
    gstNumber?: true
    hasAdditionalTradeName?: true
    additionalTradeName?: true
    phone?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    suspended: boolean
    suspended_number: number
    terminated: boolean
    isBusinessAccount: boolean | null
    businessName: string | null
    gstNumber: string | null
    hasAdditionalTradeName: boolean | null
    additionalTradeName: string | null
    phone: string
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    suspended?: boolean
    suspended_number?: boolean
    terminated?: boolean
    isBusinessAccount?: boolean
    businessName?: boolean
    gstNumber?: boolean
    hasAdditionalTradeName?: boolean
    additionalTradeName?: boolean
    phone?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cart?: boolean | User$cartArgs<ExtArgs>
    bulkCart?: boolean | User$bulkCartArgs<ExtArgs>
    addresses?: boolean | User$addressesArgs<ExtArgs>
    order?: boolean | User$orderArgs<ExtArgs>
    passwordReset?: boolean | User$passwordResetArgs<ExtArgs>
    suspensionReasons?: boolean | User$suspensionReasonsArgs<ExtArgs>
    billingAddress?: boolean | User$billingAddressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    suspended?: boolean
    suspended_number?: boolean
    terminated?: boolean
    isBusinessAccount?: boolean
    businessName?: boolean
    gstNumber?: boolean
    hasAdditionalTradeName?: boolean
    additionalTradeName?: boolean
    phone?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "suspended" | "suspended_number" | "terminated" | "isBusinessAccount" | "businessName" | "gstNumber" | "hasAdditionalTradeName" | "additionalTradeName" | "phone" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cart?: boolean | User$cartArgs<ExtArgs>
    bulkCart?: boolean | User$bulkCartArgs<ExtArgs>
    addresses?: boolean | User$addressesArgs<ExtArgs>
    order?: boolean | User$orderArgs<ExtArgs>
    passwordReset?: boolean | User$passwordResetArgs<ExtArgs>
    suspensionReasons?: boolean | User$suspensionReasonsArgs<ExtArgs>
    billingAddress?: boolean | User$billingAddressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      cart: Prisma.$CartPayload<ExtArgs>[]
      bulkCart: Prisma.$BulkCartPayload<ExtArgs>[]
      addresses: Prisma.$AddressPayload<ExtArgs>[]
      order: Prisma.$OrderPayload<ExtArgs>[]
      passwordReset: Prisma.$PasswordResetPayload<ExtArgs>[]
      suspensionReasons: Prisma.$SuspensionReasonPayload<ExtArgs>[]
      billingAddress: Prisma.$BillingAddressPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      suspended: boolean
      suspended_number: number
      terminated: boolean
      isBusinessAccount: boolean | null
      businessName: string | null
      gstNumber: string | null
      hasAdditionalTradeName: boolean | null
      additionalTradeName: string | null
      phone: string
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cart<T extends User$cartArgs<ExtArgs> = {}>(args?: Subset<T, User$cartArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bulkCart<T extends User$bulkCartArgs<ExtArgs> = {}>(args?: Subset<T, User$bulkCartArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BulkCartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    addresses<T extends User$addressesArgs<ExtArgs> = {}>(args?: Subset<T, User$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    order<T extends User$orderArgs<ExtArgs> = {}>(args?: Subset<T, User$orderArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    passwordReset<T extends User$passwordResetArgs<ExtArgs> = {}>(args?: Subset<T, User$passwordResetArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    suspensionReasons<T extends User$suspensionReasonsArgs<ExtArgs> = {}>(args?: Subset<T, User$suspensionReasonsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuspensionReasonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    billingAddress<T extends User$billingAddressArgs<ExtArgs> = {}>(args?: Subset<T, User$billingAddressArgs<ExtArgs>>): Prisma__BillingAddressClient<$Result.GetResult<Prisma.$BillingAddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly suspended: FieldRef<"User", 'Boolean'>
    readonly suspended_number: FieldRef<"User", 'Int'>
    readonly terminated: FieldRef<"User", 'Boolean'>
    readonly isBusinessAccount: FieldRef<"User", 'Boolean'>
    readonly businessName: FieldRef<"User", 'String'>
    readonly gstNumber: FieldRef<"User", 'String'>
    readonly hasAdditionalTradeName: FieldRef<"User", 'Boolean'>
    readonly additionalTradeName: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.cart
   */
  export type User$cartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    where?: CartWhereInput
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    cursor?: CartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * User.bulkCart
   */
  export type User$bulkCartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BulkCart
     */
    select?: BulkCartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BulkCart
     */
    omit?: BulkCartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BulkCartInclude<ExtArgs> | null
    where?: BulkCartWhereInput
    orderBy?: BulkCartOrderByWithRelationInput | BulkCartOrderByWithRelationInput[]
    cursor?: BulkCartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BulkCartScalarFieldEnum | BulkCartScalarFieldEnum[]
  }

  /**
   * User.addresses
   */
  export type User$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * User.order
   */
  export type User$orderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User.passwordReset
   */
  export type User$passwordResetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    where?: PasswordResetWhereInput
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    cursor?: PasswordResetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * User.suspensionReasons
   */
  export type User$suspensionReasonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuspensionReason
     */
    select?: SuspensionReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuspensionReason
     */
    omit?: SuspensionReasonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuspensionReasonInclude<ExtArgs> | null
    where?: SuspensionReasonWhereInput
    orderBy?: SuspensionReasonOrderByWithRelationInput | SuspensionReasonOrderByWithRelationInput[]
    cursor?: SuspensionReasonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SuspensionReasonScalarFieldEnum | SuspensionReasonScalarFieldEnum[]
  }

  /**
   * User.billingAddress
   */
  export type User$billingAddressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingAddress
     */
    select?: BillingAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillingAddress
     */
    omit?: BillingAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingAddressInclude<ExtArgs> | null
    where?: BillingAddressWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model OtpVerification
   */

  export type AggregateOtpVerification = {
    _count: OtpVerificationCountAggregateOutputType | null
    _min: OtpVerificationMinAggregateOutputType | null
    _max: OtpVerificationMaxAggregateOutputType | null
  }

  export type OtpVerificationMinAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    otp: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OtpVerificationMaxAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    otp: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OtpVerificationCountAggregateOutputType = {
    id: number
    email: number
    token: number
    otp: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OtpVerificationMinAggregateInputType = {
    id?: true
    email?: true
    token?: true
    otp?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OtpVerificationMaxAggregateInputType = {
    id?: true
    email?: true
    token?: true
    otp?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OtpVerificationCountAggregateInputType = {
    id?: true
    email?: true
    token?: true
    otp?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OtpVerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpVerification to aggregate.
     */
    where?: OtpVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpVerifications to fetch.
     */
    orderBy?: OtpVerificationOrderByWithRelationInput | OtpVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OtpVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OtpVerifications
    **/
    _count?: true | OtpVerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtpVerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtpVerificationMaxAggregateInputType
  }

  export type GetOtpVerificationAggregateType<T extends OtpVerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateOtpVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtpVerification[P]>
      : GetScalarType<T[P], AggregateOtpVerification[P]>
  }




  export type OtpVerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpVerificationWhereInput
    orderBy?: OtpVerificationOrderByWithAggregationInput | OtpVerificationOrderByWithAggregationInput[]
    by: OtpVerificationScalarFieldEnum[] | OtpVerificationScalarFieldEnum
    having?: OtpVerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtpVerificationCountAggregateInputType | true
    _min?: OtpVerificationMinAggregateInputType
    _max?: OtpVerificationMaxAggregateInputType
  }

  export type OtpVerificationGroupByOutputType = {
    id: string
    email: string | null
    token: string
    otp: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: OtpVerificationCountAggregateOutputType | null
    _min: OtpVerificationMinAggregateOutputType | null
    _max: OtpVerificationMaxAggregateOutputType | null
  }

  type GetOtpVerificationGroupByPayload<T extends OtpVerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtpVerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtpVerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtpVerificationGroupByOutputType[P]>
            : GetScalarType<T[P], OtpVerificationGroupByOutputType[P]>
        }
      >
    >


  export type OtpVerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    otp?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["otpVerification"]>



  export type OtpVerificationSelectScalar = {
    id?: boolean
    email?: boolean
    token?: boolean
    otp?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OtpVerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "token" | "otp" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["otpVerification"]>

  export type $OtpVerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OtpVerification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string | null
      token: string
      otp: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["otpVerification"]>
    composites: {}
  }

  type OtpVerificationGetPayload<S extends boolean | null | undefined | OtpVerificationDefaultArgs> = $Result.GetResult<Prisma.$OtpVerificationPayload, S>

  type OtpVerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OtpVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OtpVerificationCountAggregateInputType | true
    }

  export interface OtpVerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OtpVerification'], meta: { name: 'OtpVerification' } }
    /**
     * Find zero or one OtpVerification that matches the filter.
     * @param {OtpVerificationFindUniqueArgs} args - Arguments to find a OtpVerification
     * @example
     * // Get one OtpVerification
     * const otpVerification = await prisma.otpVerification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OtpVerificationFindUniqueArgs>(args: SelectSubset<T, OtpVerificationFindUniqueArgs<ExtArgs>>): Prisma__OtpVerificationClient<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OtpVerification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OtpVerificationFindUniqueOrThrowArgs} args - Arguments to find a OtpVerification
     * @example
     * // Get one OtpVerification
     * const otpVerification = await prisma.otpVerification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OtpVerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, OtpVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OtpVerificationClient<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpVerification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationFindFirstArgs} args - Arguments to find a OtpVerification
     * @example
     * // Get one OtpVerification
     * const otpVerification = await prisma.otpVerification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OtpVerificationFindFirstArgs>(args?: SelectSubset<T, OtpVerificationFindFirstArgs<ExtArgs>>): Prisma__OtpVerificationClient<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpVerification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationFindFirstOrThrowArgs} args - Arguments to find a OtpVerification
     * @example
     * // Get one OtpVerification
     * const otpVerification = await prisma.otpVerification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OtpVerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, OtpVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OtpVerificationClient<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OtpVerifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OtpVerifications
     * const otpVerifications = await prisma.otpVerification.findMany()
     * 
     * // Get first 10 OtpVerifications
     * const otpVerifications = await prisma.otpVerification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const otpVerificationWithIdOnly = await prisma.otpVerification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OtpVerificationFindManyArgs>(args?: SelectSubset<T, OtpVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OtpVerification.
     * @param {OtpVerificationCreateArgs} args - Arguments to create a OtpVerification.
     * @example
     * // Create one OtpVerification
     * const OtpVerification = await prisma.otpVerification.create({
     *   data: {
     *     // ... data to create a OtpVerification
     *   }
     * })
     * 
     */
    create<T extends OtpVerificationCreateArgs>(args: SelectSubset<T, OtpVerificationCreateArgs<ExtArgs>>): Prisma__OtpVerificationClient<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OtpVerifications.
     * @param {OtpVerificationCreateManyArgs} args - Arguments to create many OtpVerifications.
     * @example
     * // Create many OtpVerifications
     * const otpVerification = await prisma.otpVerification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OtpVerificationCreateManyArgs>(args?: SelectSubset<T, OtpVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OtpVerification.
     * @param {OtpVerificationDeleteArgs} args - Arguments to delete one OtpVerification.
     * @example
     * // Delete one OtpVerification
     * const OtpVerification = await prisma.otpVerification.delete({
     *   where: {
     *     // ... filter to delete one OtpVerification
     *   }
     * })
     * 
     */
    delete<T extends OtpVerificationDeleteArgs>(args: SelectSubset<T, OtpVerificationDeleteArgs<ExtArgs>>): Prisma__OtpVerificationClient<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OtpVerification.
     * @param {OtpVerificationUpdateArgs} args - Arguments to update one OtpVerification.
     * @example
     * // Update one OtpVerification
     * const otpVerification = await prisma.otpVerification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OtpVerificationUpdateArgs>(args: SelectSubset<T, OtpVerificationUpdateArgs<ExtArgs>>): Prisma__OtpVerificationClient<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OtpVerifications.
     * @param {OtpVerificationDeleteManyArgs} args - Arguments to filter OtpVerifications to delete.
     * @example
     * // Delete a few OtpVerifications
     * const { count } = await prisma.otpVerification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OtpVerificationDeleteManyArgs>(args?: SelectSubset<T, OtpVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OtpVerifications
     * const otpVerification = await prisma.otpVerification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OtpVerificationUpdateManyArgs>(args: SelectSubset<T, OtpVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OtpVerification.
     * @param {OtpVerificationUpsertArgs} args - Arguments to update or create a OtpVerification.
     * @example
     * // Update or create a OtpVerification
     * const otpVerification = await prisma.otpVerification.upsert({
     *   create: {
     *     // ... data to create a OtpVerification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OtpVerification we want to update
     *   }
     * })
     */
    upsert<T extends OtpVerificationUpsertArgs>(args: SelectSubset<T, OtpVerificationUpsertArgs<ExtArgs>>): Prisma__OtpVerificationClient<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OtpVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationCountArgs} args - Arguments to filter OtpVerifications to count.
     * @example
     * // Count the number of OtpVerifications
     * const count = await prisma.otpVerification.count({
     *   where: {
     *     // ... the filter for the OtpVerifications we want to count
     *   }
     * })
    **/
    count<T extends OtpVerificationCountArgs>(
      args?: Subset<T, OtpVerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtpVerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OtpVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OtpVerificationAggregateArgs>(args: Subset<T, OtpVerificationAggregateArgs>): Prisma.PrismaPromise<GetOtpVerificationAggregateType<T>>

    /**
     * Group by OtpVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationGroupByArgs} args - Group by arguments.
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
      T extends OtpVerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OtpVerificationGroupByArgs['orderBy'] }
        : { orderBy?: OtpVerificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OtpVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OtpVerification model
   */
  readonly fields: OtpVerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OtpVerification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OtpVerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the OtpVerification model
   */
  interface OtpVerificationFieldRefs {
    readonly id: FieldRef<"OtpVerification", 'String'>
    readonly email: FieldRef<"OtpVerification", 'String'>
    readonly token: FieldRef<"OtpVerification", 'String'>
    readonly otp: FieldRef<"OtpVerification", 'String'>
    readonly expiresAt: FieldRef<"OtpVerification", 'DateTime'>
    readonly createdAt: FieldRef<"OtpVerification", 'DateTime'>
    readonly updatedAt: FieldRef<"OtpVerification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OtpVerification findUnique
   */
  export type OtpVerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * Filter, which OtpVerification to fetch.
     */
    where: OtpVerificationWhereUniqueInput
  }

  /**
   * OtpVerification findUniqueOrThrow
   */
  export type OtpVerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * Filter, which OtpVerification to fetch.
     */
    where: OtpVerificationWhereUniqueInput
  }

  /**
   * OtpVerification findFirst
   */
  export type OtpVerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * Filter, which OtpVerification to fetch.
     */
    where?: OtpVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpVerifications to fetch.
     */
    orderBy?: OtpVerificationOrderByWithRelationInput | OtpVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpVerifications.
     */
    cursor?: OtpVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpVerifications.
     */
    distinct?: OtpVerificationScalarFieldEnum | OtpVerificationScalarFieldEnum[]
  }

  /**
   * OtpVerification findFirstOrThrow
   */
  export type OtpVerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * Filter, which OtpVerification to fetch.
     */
    where?: OtpVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpVerifications to fetch.
     */
    orderBy?: OtpVerificationOrderByWithRelationInput | OtpVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpVerifications.
     */
    cursor?: OtpVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpVerifications.
     */
    distinct?: OtpVerificationScalarFieldEnum | OtpVerificationScalarFieldEnum[]
  }

  /**
   * OtpVerification findMany
   */
  export type OtpVerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * Filter, which OtpVerifications to fetch.
     */
    where?: OtpVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpVerifications to fetch.
     */
    orderBy?: OtpVerificationOrderByWithRelationInput | OtpVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OtpVerifications.
     */
    cursor?: OtpVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpVerifications.
     */
    skip?: number
    distinct?: OtpVerificationScalarFieldEnum | OtpVerificationScalarFieldEnum[]
  }

  /**
   * OtpVerification create
   */
  export type OtpVerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a OtpVerification.
     */
    data: XOR<OtpVerificationCreateInput, OtpVerificationUncheckedCreateInput>
  }

  /**
   * OtpVerification createMany
   */
  export type OtpVerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OtpVerifications.
     */
    data: OtpVerificationCreateManyInput | OtpVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpVerification update
   */
  export type OtpVerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a OtpVerification.
     */
    data: XOR<OtpVerificationUpdateInput, OtpVerificationUncheckedUpdateInput>
    /**
     * Choose, which OtpVerification to update.
     */
    where: OtpVerificationWhereUniqueInput
  }

  /**
   * OtpVerification updateMany
   */
  export type OtpVerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OtpVerifications.
     */
    data: XOR<OtpVerificationUpdateManyMutationInput, OtpVerificationUncheckedUpdateManyInput>
    /**
     * Filter which OtpVerifications to update
     */
    where?: OtpVerificationWhereInput
    /**
     * Limit how many OtpVerifications to update.
     */
    limit?: number
  }

  /**
   * OtpVerification upsert
   */
  export type OtpVerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the OtpVerification to update in case it exists.
     */
    where: OtpVerificationWhereUniqueInput
    /**
     * In case the OtpVerification found by the `where` argument doesn't exist, create a new OtpVerification with this data.
     */
    create: XOR<OtpVerificationCreateInput, OtpVerificationUncheckedCreateInput>
    /**
     * In case the OtpVerification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OtpVerificationUpdateInput, OtpVerificationUncheckedUpdateInput>
  }

  /**
   * OtpVerification delete
   */
  export type OtpVerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * Filter which OtpVerification to delete.
     */
    where: OtpVerificationWhereUniqueInput
  }

  /**
   * OtpVerification deleteMany
   */
  export type OtpVerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpVerifications to delete
     */
    where?: OtpVerificationWhereInput
    /**
     * Limit how many OtpVerifications to delete.
     */
    limit?: number
  }

  /**
   * OtpVerification without action
   */
  export type OtpVerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
  }


  /**
   * Model Cart
   */

  export type AggregateCart = {
    _count: CartCountAggregateOutputType | null
    _avg: CartAvgAggregateOutputType | null
    _sum: CartSumAggregateOutputType | null
    _min: CartMinAggregateOutputType | null
    _max: CartMaxAggregateOutputType | null
  }

  export type CartAvgAggregateOutputType = {
    quantity: number | null
  }

  export type CartSumAggregateOutputType = {
    quantity: number | null
  }

  export type CartMinAggregateOutputType = {
    id: string | null
    userId: string | null
    productId: string | null
    quantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CartMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    productId: string | null
    quantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CartCountAggregateOutputType = {
    id: number
    userId: number
    productId: number
    quantity: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CartAvgAggregateInputType = {
    quantity?: true
  }

  export type CartSumAggregateInputType = {
    quantity?: true
  }

  export type CartMinAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CartMaxAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CartCountAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cart to aggregate.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Carts
    **/
    _count?: true | CartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CartMaxAggregateInputType
  }

  export type GetCartAggregateType<T extends CartAggregateArgs> = {
        [P in keyof T & keyof AggregateCart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCart[P]>
      : GetScalarType<T[P], AggregateCart[P]>
  }




  export type CartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartWhereInput
    orderBy?: CartOrderByWithAggregationInput | CartOrderByWithAggregationInput[]
    by: CartScalarFieldEnum[] | CartScalarFieldEnum
    having?: CartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CartCountAggregateInputType | true
    _avg?: CartAvgAggregateInputType
    _sum?: CartSumAggregateInputType
    _min?: CartMinAggregateInputType
    _max?: CartMaxAggregateInputType
  }

  export type CartGroupByOutputType = {
    id: string
    userId: string
    productId: string
    quantity: number
    createdAt: Date
    updatedAt: Date
    _count: CartCountAggregateOutputType | null
    _avg: CartAvgAggregateOutputType | null
    _sum: CartSumAggregateOutputType | null
    _min: CartMinAggregateOutputType | null
    _max: CartMaxAggregateOutputType | null
  }

  type GetCartGroupByPayload<T extends CartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CartGroupByOutputType[P]>
            : GetScalarType<T[P], CartGroupByOutputType[P]>
        }
      >
    >


  export type CartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productId?: boolean
    quantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cart"]>



  export type CartSelectScalar = {
    id?: boolean
    userId?: boolean
    productId?: boolean
    quantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "productId" | "quantity" | "createdAt" | "updatedAt", ExtArgs["result"]["cart"]>
  export type CartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cart"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      productId: string
      quantity: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cart"]>
    composites: {}
  }

  type CartGetPayload<S extends boolean | null | undefined | CartDefaultArgs> = $Result.GetResult<Prisma.$CartPayload, S>

  type CartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CartCountAggregateInputType | true
    }

  export interface CartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cart'], meta: { name: 'Cart' } }
    /**
     * Find zero or one Cart that matches the filter.
     * @param {CartFindUniqueArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CartFindUniqueArgs>(args: SelectSubset<T, CartFindUniqueArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CartFindUniqueOrThrowArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CartFindUniqueOrThrowArgs>(args: SelectSubset<T, CartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindFirstArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CartFindFirstArgs>(args?: SelectSubset<T, CartFindFirstArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindFirstOrThrowArgs} args - Arguments to find a Cart
     * @example
     * // Get one Cart
     * const cart = await prisma.cart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CartFindFirstOrThrowArgs>(args?: SelectSubset<T, CartFindFirstOrThrowArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Carts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Carts
     * const carts = await prisma.cart.findMany()
     * 
     * // Get first 10 Carts
     * const carts = await prisma.cart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cartWithIdOnly = await prisma.cart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CartFindManyArgs>(args?: SelectSubset<T, CartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cart.
     * @param {CartCreateArgs} args - Arguments to create a Cart.
     * @example
     * // Create one Cart
     * const Cart = await prisma.cart.create({
     *   data: {
     *     // ... data to create a Cart
     *   }
     * })
     * 
     */
    create<T extends CartCreateArgs>(args: SelectSubset<T, CartCreateArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Carts.
     * @param {CartCreateManyArgs} args - Arguments to create many Carts.
     * @example
     * // Create many Carts
     * const cart = await prisma.cart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CartCreateManyArgs>(args?: SelectSubset<T, CartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Cart.
     * @param {CartDeleteArgs} args - Arguments to delete one Cart.
     * @example
     * // Delete one Cart
     * const Cart = await prisma.cart.delete({
     *   where: {
     *     // ... filter to delete one Cart
     *   }
     * })
     * 
     */
    delete<T extends CartDeleteArgs>(args: SelectSubset<T, CartDeleteArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cart.
     * @param {CartUpdateArgs} args - Arguments to update one Cart.
     * @example
     * // Update one Cart
     * const cart = await prisma.cart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CartUpdateArgs>(args: SelectSubset<T, CartUpdateArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Carts.
     * @param {CartDeleteManyArgs} args - Arguments to filter Carts to delete.
     * @example
     * // Delete a few Carts
     * const { count } = await prisma.cart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CartDeleteManyArgs>(args?: SelectSubset<T, CartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Carts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Carts
     * const cart = await prisma.cart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CartUpdateManyArgs>(args: SelectSubset<T, CartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cart.
     * @param {CartUpsertArgs} args - Arguments to update or create a Cart.
     * @example
     * // Update or create a Cart
     * const cart = await prisma.cart.upsert({
     *   create: {
     *     // ... data to create a Cart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cart we want to update
     *   }
     * })
     */
    upsert<T extends CartUpsertArgs>(args: SelectSubset<T, CartUpsertArgs<ExtArgs>>): Prisma__CartClient<$Result.GetResult<Prisma.$CartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Carts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartCountArgs} args - Arguments to filter Carts to count.
     * @example
     * // Count the number of Carts
     * const count = await prisma.cart.count({
     *   where: {
     *     // ... the filter for the Carts we want to count
     *   }
     * })
    **/
    count<T extends CartCountArgs>(
      args?: Subset<T, CartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CartAggregateArgs>(args: Subset<T, CartAggregateArgs>): Prisma.PrismaPromise<GetCartAggregateType<T>>

    /**
     * Group by Cart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartGroupByArgs} args - Group by arguments.
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
      T extends CartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CartGroupByArgs['orderBy'] }
        : { orderBy?: CartGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cart model
   */
  readonly fields: CartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Cart model
   */
  interface CartFieldRefs {
    readonly id: FieldRef<"Cart", 'String'>
    readonly userId: FieldRef<"Cart", 'String'>
    readonly productId: FieldRef<"Cart", 'String'>
    readonly quantity: FieldRef<"Cart", 'Int'>
    readonly createdAt: FieldRef<"Cart", 'DateTime'>
    readonly updatedAt: FieldRef<"Cart", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cart findUnique
   */
  export type CartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart findUniqueOrThrow
   */
  export type CartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart findFirst
   */
  export type CartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carts.
     */
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart findFirstOrThrow
   */
  export type CartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Cart to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Carts.
     */
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart findMany
   */
  export type CartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter, which Carts to fetch.
     */
    where?: CartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Carts to fetch.
     */
    orderBy?: CartOrderByWithRelationInput | CartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Carts.
     */
    cursor?: CartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Carts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Carts.
     */
    skip?: number
    distinct?: CartScalarFieldEnum | CartScalarFieldEnum[]
  }

  /**
   * Cart create
   */
  export type CartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The data needed to create a Cart.
     */
    data: XOR<CartCreateInput, CartUncheckedCreateInput>
  }

  /**
   * Cart createMany
   */
  export type CartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Carts.
     */
    data: CartCreateManyInput | CartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cart update
   */
  export type CartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The data needed to update a Cart.
     */
    data: XOR<CartUpdateInput, CartUncheckedUpdateInput>
    /**
     * Choose, which Cart to update.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart updateMany
   */
  export type CartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Carts.
     */
    data: XOR<CartUpdateManyMutationInput, CartUncheckedUpdateManyInput>
    /**
     * Filter which Carts to update
     */
    where?: CartWhereInput
    /**
     * Limit how many Carts to update.
     */
    limit?: number
  }

  /**
   * Cart upsert
   */
  export type CartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * The filter to search for the Cart to update in case it exists.
     */
    where: CartWhereUniqueInput
    /**
     * In case the Cart found by the `where` argument doesn't exist, create a new Cart with this data.
     */
    create: XOR<CartCreateInput, CartUncheckedCreateInput>
    /**
     * In case the Cart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CartUpdateInput, CartUncheckedUpdateInput>
  }

  /**
   * Cart delete
   */
  export type CartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
    /**
     * Filter which Cart to delete.
     */
    where: CartWhereUniqueInput
  }

  /**
   * Cart deleteMany
   */
  export type CartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Carts to delete
     */
    where?: CartWhereInput
    /**
     * Limit how many Carts to delete.
     */
    limit?: number
  }

  /**
   * Cart without action
   */
  export type CartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cart
     */
    select?: CartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cart
     */
    omit?: CartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartInclude<ExtArgs> | null
  }


  /**
   * Model BulkCart
   */

  export type AggregateBulkCart = {
    _count: BulkCartCountAggregateOutputType | null
    _avg: BulkCartAvgAggregateOutputType | null
    _sum: BulkCartSumAggregateOutputType | null
    _min: BulkCartMinAggregateOutputType | null
    _max: BulkCartMaxAggregateOutputType | null
  }

  export type BulkCartAvgAggregateOutputType = {
    quantity: number | null
  }

  export type BulkCartSumAggregateOutputType = {
    quantity: number | null
  }

  export type BulkCartMinAggregateOutputType = {
    id: string | null
    userId: string | null
    productId: string | null
    quantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BulkCartMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    productId: string | null
    quantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BulkCartCountAggregateOutputType = {
    id: number
    userId: number
    productId: number
    quantity: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BulkCartAvgAggregateInputType = {
    quantity?: true
  }

  export type BulkCartSumAggregateInputType = {
    quantity?: true
  }

  export type BulkCartMinAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BulkCartMaxAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BulkCartCountAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BulkCartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BulkCart to aggregate.
     */
    where?: BulkCartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BulkCarts to fetch.
     */
    orderBy?: BulkCartOrderByWithRelationInput | BulkCartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BulkCartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BulkCarts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BulkCarts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BulkCarts
    **/
    _count?: true | BulkCartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BulkCartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BulkCartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BulkCartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BulkCartMaxAggregateInputType
  }

  export type GetBulkCartAggregateType<T extends BulkCartAggregateArgs> = {
        [P in keyof T & keyof AggregateBulkCart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBulkCart[P]>
      : GetScalarType<T[P], AggregateBulkCart[P]>
  }




  export type BulkCartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BulkCartWhereInput
    orderBy?: BulkCartOrderByWithAggregationInput | BulkCartOrderByWithAggregationInput[]
    by: BulkCartScalarFieldEnum[] | BulkCartScalarFieldEnum
    having?: BulkCartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BulkCartCountAggregateInputType | true
    _avg?: BulkCartAvgAggregateInputType
    _sum?: BulkCartSumAggregateInputType
    _min?: BulkCartMinAggregateInputType
    _max?: BulkCartMaxAggregateInputType
  }

  export type BulkCartGroupByOutputType = {
    id: string
    userId: string
    productId: string
    quantity: number
    createdAt: Date
    updatedAt: Date
    _count: BulkCartCountAggregateOutputType | null
    _avg: BulkCartAvgAggregateOutputType | null
    _sum: BulkCartSumAggregateOutputType | null
    _min: BulkCartMinAggregateOutputType | null
    _max: BulkCartMaxAggregateOutputType | null
  }

  type GetBulkCartGroupByPayload<T extends BulkCartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BulkCartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BulkCartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BulkCartGroupByOutputType[P]>
            : GetScalarType<T[P], BulkCartGroupByOutputType[P]>
        }
      >
    >


  export type BulkCartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productId?: boolean
    quantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bulkCart"]>



  export type BulkCartSelectScalar = {
    id?: boolean
    userId?: boolean
    productId?: boolean
    quantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BulkCartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "productId" | "quantity" | "createdAt" | "updatedAt", ExtArgs["result"]["bulkCart"]>
  export type BulkCartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BulkCartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BulkCart"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      productId: string
      quantity: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["bulkCart"]>
    composites: {}
  }

  type BulkCartGetPayload<S extends boolean | null | undefined | BulkCartDefaultArgs> = $Result.GetResult<Prisma.$BulkCartPayload, S>

  type BulkCartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BulkCartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BulkCartCountAggregateInputType | true
    }

  export interface BulkCartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BulkCart'], meta: { name: 'BulkCart' } }
    /**
     * Find zero or one BulkCart that matches the filter.
     * @param {BulkCartFindUniqueArgs} args - Arguments to find a BulkCart
     * @example
     * // Get one BulkCart
     * const bulkCart = await prisma.bulkCart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BulkCartFindUniqueArgs>(args: SelectSubset<T, BulkCartFindUniqueArgs<ExtArgs>>): Prisma__BulkCartClient<$Result.GetResult<Prisma.$BulkCartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BulkCart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BulkCartFindUniqueOrThrowArgs} args - Arguments to find a BulkCart
     * @example
     * // Get one BulkCart
     * const bulkCart = await prisma.bulkCart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BulkCartFindUniqueOrThrowArgs>(args: SelectSubset<T, BulkCartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BulkCartClient<$Result.GetResult<Prisma.$BulkCartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BulkCart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BulkCartFindFirstArgs} args - Arguments to find a BulkCart
     * @example
     * // Get one BulkCart
     * const bulkCart = await prisma.bulkCart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BulkCartFindFirstArgs>(args?: SelectSubset<T, BulkCartFindFirstArgs<ExtArgs>>): Prisma__BulkCartClient<$Result.GetResult<Prisma.$BulkCartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BulkCart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BulkCartFindFirstOrThrowArgs} args - Arguments to find a BulkCart
     * @example
     * // Get one BulkCart
     * const bulkCart = await prisma.bulkCart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BulkCartFindFirstOrThrowArgs>(args?: SelectSubset<T, BulkCartFindFirstOrThrowArgs<ExtArgs>>): Prisma__BulkCartClient<$Result.GetResult<Prisma.$BulkCartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BulkCarts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BulkCartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BulkCarts
     * const bulkCarts = await prisma.bulkCart.findMany()
     * 
     * // Get first 10 BulkCarts
     * const bulkCarts = await prisma.bulkCart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bulkCartWithIdOnly = await prisma.bulkCart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BulkCartFindManyArgs>(args?: SelectSubset<T, BulkCartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BulkCartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BulkCart.
     * @param {BulkCartCreateArgs} args - Arguments to create a BulkCart.
     * @example
     * // Create one BulkCart
     * const BulkCart = await prisma.bulkCart.create({
     *   data: {
     *     // ... data to create a BulkCart
     *   }
     * })
     * 
     */
    create<T extends BulkCartCreateArgs>(args: SelectSubset<T, BulkCartCreateArgs<ExtArgs>>): Prisma__BulkCartClient<$Result.GetResult<Prisma.$BulkCartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BulkCarts.
     * @param {BulkCartCreateManyArgs} args - Arguments to create many BulkCarts.
     * @example
     * // Create many BulkCarts
     * const bulkCart = await prisma.bulkCart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BulkCartCreateManyArgs>(args?: SelectSubset<T, BulkCartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BulkCart.
     * @param {BulkCartDeleteArgs} args - Arguments to delete one BulkCart.
     * @example
     * // Delete one BulkCart
     * const BulkCart = await prisma.bulkCart.delete({
     *   where: {
     *     // ... filter to delete one BulkCart
     *   }
     * })
     * 
     */
    delete<T extends BulkCartDeleteArgs>(args: SelectSubset<T, BulkCartDeleteArgs<ExtArgs>>): Prisma__BulkCartClient<$Result.GetResult<Prisma.$BulkCartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BulkCart.
     * @param {BulkCartUpdateArgs} args - Arguments to update one BulkCart.
     * @example
     * // Update one BulkCart
     * const bulkCart = await prisma.bulkCart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BulkCartUpdateArgs>(args: SelectSubset<T, BulkCartUpdateArgs<ExtArgs>>): Prisma__BulkCartClient<$Result.GetResult<Prisma.$BulkCartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BulkCarts.
     * @param {BulkCartDeleteManyArgs} args - Arguments to filter BulkCarts to delete.
     * @example
     * // Delete a few BulkCarts
     * const { count } = await prisma.bulkCart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BulkCartDeleteManyArgs>(args?: SelectSubset<T, BulkCartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BulkCarts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BulkCartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BulkCarts
     * const bulkCart = await prisma.bulkCart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BulkCartUpdateManyArgs>(args: SelectSubset<T, BulkCartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BulkCart.
     * @param {BulkCartUpsertArgs} args - Arguments to update or create a BulkCart.
     * @example
     * // Update or create a BulkCart
     * const bulkCart = await prisma.bulkCart.upsert({
     *   create: {
     *     // ... data to create a BulkCart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BulkCart we want to update
     *   }
     * })
     */
    upsert<T extends BulkCartUpsertArgs>(args: SelectSubset<T, BulkCartUpsertArgs<ExtArgs>>): Prisma__BulkCartClient<$Result.GetResult<Prisma.$BulkCartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BulkCarts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BulkCartCountArgs} args - Arguments to filter BulkCarts to count.
     * @example
     * // Count the number of BulkCarts
     * const count = await prisma.bulkCart.count({
     *   where: {
     *     // ... the filter for the BulkCarts we want to count
     *   }
     * })
    **/
    count<T extends BulkCartCountArgs>(
      args?: Subset<T, BulkCartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BulkCartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BulkCart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BulkCartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BulkCartAggregateArgs>(args: Subset<T, BulkCartAggregateArgs>): Prisma.PrismaPromise<GetBulkCartAggregateType<T>>

    /**
     * Group by BulkCart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BulkCartGroupByArgs} args - Group by arguments.
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
      T extends BulkCartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BulkCartGroupByArgs['orderBy'] }
        : { orderBy?: BulkCartGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BulkCartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBulkCartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BulkCart model
   */
  readonly fields: BulkCartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BulkCart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BulkCartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the BulkCart model
   */
  interface BulkCartFieldRefs {
    readonly id: FieldRef<"BulkCart", 'String'>
    readonly userId: FieldRef<"BulkCart", 'String'>
    readonly productId: FieldRef<"BulkCart", 'String'>
    readonly quantity: FieldRef<"BulkCart", 'Int'>
    readonly createdAt: FieldRef<"BulkCart", 'DateTime'>
    readonly updatedAt: FieldRef<"BulkCart", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BulkCart findUnique
   */
  export type BulkCartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BulkCart
     */
    select?: BulkCartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BulkCart
     */
    omit?: BulkCartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BulkCartInclude<ExtArgs> | null
    /**
     * Filter, which BulkCart to fetch.
     */
    where: BulkCartWhereUniqueInput
  }

  /**
   * BulkCart findUniqueOrThrow
   */
  export type BulkCartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BulkCart
     */
    select?: BulkCartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BulkCart
     */
    omit?: BulkCartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BulkCartInclude<ExtArgs> | null
    /**
     * Filter, which BulkCart to fetch.
     */
    where: BulkCartWhereUniqueInput
  }

  /**
   * BulkCart findFirst
   */
  export type BulkCartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BulkCart
     */
    select?: BulkCartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BulkCart
     */
    omit?: BulkCartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BulkCartInclude<ExtArgs> | null
    /**
     * Filter, which BulkCart to fetch.
     */
    where?: BulkCartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BulkCarts to fetch.
     */
    orderBy?: BulkCartOrderByWithRelationInput | BulkCartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BulkCarts.
     */
    cursor?: BulkCartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BulkCarts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BulkCarts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BulkCarts.
     */
    distinct?: BulkCartScalarFieldEnum | BulkCartScalarFieldEnum[]
  }

  /**
   * BulkCart findFirstOrThrow
   */
  export type BulkCartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BulkCart
     */
    select?: BulkCartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BulkCart
     */
    omit?: BulkCartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BulkCartInclude<ExtArgs> | null
    /**
     * Filter, which BulkCart to fetch.
     */
    where?: BulkCartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BulkCarts to fetch.
     */
    orderBy?: BulkCartOrderByWithRelationInput | BulkCartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BulkCarts.
     */
    cursor?: BulkCartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BulkCarts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BulkCarts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BulkCarts.
     */
    distinct?: BulkCartScalarFieldEnum | BulkCartScalarFieldEnum[]
  }

  /**
   * BulkCart findMany
   */
  export type BulkCartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BulkCart
     */
    select?: BulkCartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BulkCart
     */
    omit?: BulkCartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BulkCartInclude<ExtArgs> | null
    /**
     * Filter, which BulkCarts to fetch.
     */
    where?: BulkCartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BulkCarts to fetch.
     */
    orderBy?: BulkCartOrderByWithRelationInput | BulkCartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BulkCarts.
     */
    cursor?: BulkCartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BulkCarts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BulkCarts.
     */
    skip?: number
    distinct?: BulkCartScalarFieldEnum | BulkCartScalarFieldEnum[]
  }

  /**
   * BulkCart create
   */
  export type BulkCartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BulkCart
     */
    select?: BulkCartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BulkCart
     */
    omit?: BulkCartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BulkCartInclude<ExtArgs> | null
    /**
     * The data needed to create a BulkCart.
     */
    data: XOR<BulkCartCreateInput, BulkCartUncheckedCreateInput>
  }

  /**
   * BulkCart createMany
   */
  export type BulkCartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BulkCarts.
     */
    data: BulkCartCreateManyInput | BulkCartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BulkCart update
   */
  export type BulkCartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BulkCart
     */
    select?: BulkCartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BulkCart
     */
    omit?: BulkCartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BulkCartInclude<ExtArgs> | null
    /**
     * The data needed to update a BulkCart.
     */
    data: XOR<BulkCartUpdateInput, BulkCartUncheckedUpdateInput>
    /**
     * Choose, which BulkCart to update.
     */
    where: BulkCartWhereUniqueInput
  }

  /**
   * BulkCart updateMany
   */
  export type BulkCartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BulkCarts.
     */
    data: XOR<BulkCartUpdateManyMutationInput, BulkCartUncheckedUpdateManyInput>
    /**
     * Filter which BulkCarts to update
     */
    where?: BulkCartWhereInput
    /**
     * Limit how many BulkCarts to update.
     */
    limit?: number
  }

  /**
   * BulkCart upsert
   */
  export type BulkCartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BulkCart
     */
    select?: BulkCartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BulkCart
     */
    omit?: BulkCartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BulkCartInclude<ExtArgs> | null
    /**
     * The filter to search for the BulkCart to update in case it exists.
     */
    where: BulkCartWhereUniqueInput
    /**
     * In case the BulkCart found by the `where` argument doesn't exist, create a new BulkCart with this data.
     */
    create: XOR<BulkCartCreateInput, BulkCartUncheckedCreateInput>
    /**
     * In case the BulkCart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BulkCartUpdateInput, BulkCartUncheckedUpdateInput>
  }

  /**
   * BulkCart delete
   */
  export type BulkCartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BulkCart
     */
    select?: BulkCartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BulkCart
     */
    omit?: BulkCartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BulkCartInclude<ExtArgs> | null
    /**
     * Filter which BulkCart to delete.
     */
    where: BulkCartWhereUniqueInput
  }

  /**
   * BulkCart deleteMany
   */
  export type BulkCartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BulkCarts to delete
     */
    where?: BulkCartWhereInput
    /**
     * Limit how many BulkCarts to delete.
     */
    limit?: number
  }

  /**
   * BulkCart without action
   */
  export type BulkCartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BulkCart
     */
    select?: BulkCartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BulkCart
     */
    omit?: BulkCartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BulkCartInclude<ExtArgs> | null
  }


  /**
   * Model Address
   */

  export type AggregateAddress = {
    _count: AddressCountAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  export type AddressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    name: string | null
    phone: string | null
    houseNo: string | null
    line1: string | null
    line2: string | null
    city: string | null
    district: string | null
    state: string | null
    stateCode: string | null
    country: string | null
    pincode: string | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AddressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    name: string | null
    phone: string | null
    houseNo: string | null
    line1: string | null
    line2: string | null
    city: string | null
    district: string | null
    state: string | null
    stateCode: string | null
    country: string | null
    pincode: string | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AddressCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    name: number
    phone: number
    houseNo: number
    line1: number
    line2: number
    city: number
    district: number
    state: number
    stateCode: number
    country: number
    pincode: number
    isDefault: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AddressMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    name?: true
    phone?: true
    houseNo?: true
    line1?: true
    line2?: true
    city?: true
    district?: true
    state?: true
    stateCode?: true
    country?: true
    pincode?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AddressMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    name?: true
    phone?: true
    houseNo?: true
    line1?: true
    line2?: true
    city?: true
    district?: true
    state?: true
    stateCode?: true
    country?: true
    pincode?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AddressCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    name?: true
    phone?: true
    houseNo?: true
    line1?: true
    line2?: true
    city?: true
    district?: true
    state?: true
    stateCode?: true
    country?: true
    pincode?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Address to aggregate.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Addresses
    **/
    _count?: true | AddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressMaxAggregateInputType
  }

  export type GetAddressAggregateType<T extends AddressAggregateArgs> = {
        [P in keyof T & keyof AggregateAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddress[P]>
      : GetScalarType<T[P], AggregateAddress[P]>
  }




  export type AddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithAggregationInput | AddressOrderByWithAggregationInput[]
    by: AddressScalarFieldEnum[] | AddressScalarFieldEnum
    having?: AddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressCountAggregateInputType | true
    _min?: AddressMinAggregateInputType
    _max?: AddressMaxAggregateInputType
  }

  export type AddressGroupByOutputType = {
    id: string
    userId: string
    type: string
    name: string
    phone: string
    houseNo: string
    line1: string
    line2: string | null
    city: string
    district: string
    state: string
    stateCode: string | null
    country: string
    pincode: string
    isDefault: boolean
    createdAt: Date
    updatedAt: Date
    _count: AddressCountAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  type GetAddressGroupByPayload<T extends AddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressGroupByOutputType[P]>
            : GetScalarType<T[P], AddressGroupByOutputType[P]>
        }
      >
    >


  export type AddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    name?: boolean
    phone?: boolean
    houseNo?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    district?: boolean
    state?: boolean
    stateCode?: boolean
    country?: boolean
    pincode?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    orders?: boolean | Address$ordersArgs<ExtArgs>
    _count?: boolean | AddressCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>



  export type AddressSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    name?: boolean
    phone?: boolean
    houseNo?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    district?: boolean
    state?: boolean
    stateCode?: boolean
    country?: boolean
    pincode?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AddressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "name" | "phone" | "houseNo" | "line1" | "line2" | "city" | "district" | "state" | "stateCode" | "country" | "pincode" | "isDefault" | "createdAt" | "updatedAt", ExtArgs["result"]["address"]>
  export type AddressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    orders?: boolean | Address$ordersArgs<ExtArgs>
    _count?: boolean | AddressCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Address"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      name: string
      phone: string
      houseNo: string
      line1: string
      line2: string | null
      city: string
      district: string
      state: string
      stateCode: string | null
      country: string
      pincode: string
      isDefault: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["address"]>
    composites: {}
  }

  type AddressGetPayload<S extends boolean | null | undefined | AddressDefaultArgs> = $Result.GetResult<Prisma.$AddressPayload, S>

  type AddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AddressCountAggregateInputType | true
    }

  export interface AddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Address'], meta: { name: 'Address' } }
    /**
     * Find zero or one Address that matches the filter.
     * @param {AddressFindUniqueArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressFindUniqueArgs>(args: SelectSubset<T, AddressFindUniqueArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Address that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddressFindUniqueOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressFindFirstArgs>(args?: SelectSubset<T, AddressFindFirstArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Addresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Addresses
     * const addresses = await prisma.address.findMany()
     * 
     * // Get first 10 Addresses
     * const addresses = await prisma.address.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressWithIdOnly = await prisma.address.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressFindManyArgs>(args?: SelectSubset<T, AddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Address.
     * @param {AddressCreateArgs} args - Arguments to create a Address.
     * @example
     * // Create one Address
     * const Address = await prisma.address.create({
     *   data: {
     *     // ... data to create a Address
     *   }
     * })
     * 
     */
    create<T extends AddressCreateArgs>(args: SelectSubset<T, AddressCreateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Addresses.
     * @param {AddressCreateManyArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressCreateManyArgs>(args?: SelectSubset<T, AddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Address.
     * @param {AddressDeleteArgs} args - Arguments to delete one Address.
     * @example
     * // Delete one Address
     * const Address = await prisma.address.delete({
     *   where: {
     *     // ... filter to delete one Address
     *   }
     * })
     * 
     */
    delete<T extends AddressDeleteArgs>(args: SelectSubset<T, AddressDeleteArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Address.
     * @param {AddressUpdateArgs} args - Arguments to update one Address.
     * @example
     * // Update one Address
     * const address = await prisma.address.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressUpdateArgs>(args: SelectSubset<T, AddressUpdateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Addresses.
     * @param {AddressDeleteManyArgs} args - Arguments to filter Addresses to delete.
     * @example
     * // Delete a few Addresses
     * const { count } = await prisma.address.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressDeleteManyArgs>(args?: SelectSubset<T, AddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressUpdateManyArgs>(args: SelectSubset<T, AddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Address.
     * @param {AddressUpsertArgs} args - Arguments to update or create a Address.
     * @example
     * // Update or create a Address
     * const address = await prisma.address.upsert({
     *   create: {
     *     // ... data to create a Address
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Address we want to update
     *   }
     * })
     */
    upsert<T extends AddressUpsertArgs>(args: SelectSubset<T, AddressUpsertArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressCountArgs} args - Arguments to filter Addresses to count.
     * @example
     * // Count the number of Addresses
     * const count = await prisma.address.count({
     *   where: {
     *     // ... the filter for the Addresses we want to count
     *   }
     * })
    **/
    count<T extends AddressCountArgs>(
      args?: Subset<T, AddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AddressAggregateArgs>(args: Subset<T, AddressAggregateArgs>): Prisma.PrismaPromise<GetAddressAggregateType<T>>

    /**
     * Group by Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressGroupByArgs} args - Group by arguments.
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
      T extends AddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressGroupByArgs['orderBy'] }
        : { orderBy?: AddressGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Address model
   */
  readonly fields: AddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Address.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    orders<T extends Address$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Address$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Address model
   */
  interface AddressFieldRefs {
    readonly id: FieldRef<"Address", 'String'>
    readonly userId: FieldRef<"Address", 'String'>
    readonly type: FieldRef<"Address", 'String'>
    readonly name: FieldRef<"Address", 'String'>
    readonly phone: FieldRef<"Address", 'String'>
    readonly houseNo: FieldRef<"Address", 'String'>
    readonly line1: FieldRef<"Address", 'String'>
    readonly line2: FieldRef<"Address", 'String'>
    readonly city: FieldRef<"Address", 'String'>
    readonly district: FieldRef<"Address", 'String'>
    readonly state: FieldRef<"Address", 'String'>
    readonly stateCode: FieldRef<"Address", 'String'>
    readonly country: FieldRef<"Address", 'String'>
    readonly pincode: FieldRef<"Address", 'String'>
    readonly isDefault: FieldRef<"Address", 'Boolean'>
    readonly createdAt: FieldRef<"Address", 'DateTime'>
    readonly updatedAt: FieldRef<"Address", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Address findUnique
   */
  export type AddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findUniqueOrThrow
   */
  export type AddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findFirst
   */
  export type AddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findFirstOrThrow
   */
  export type AddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findMany
   */
  export type AddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Addresses to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address create
   */
  export type AddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to create a Address.
     */
    data: XOR<AddressCreateInput, AddressUncheckedCreateInput>
  }

  /**
   * Address createMany
   */
  export type AddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Address update
   */
  export type AddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to update a Address.
     */
    data: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
    /**
     * Choose, which Address to update.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address updateMany
   */
  export type AddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to update.
     */
    limit?: number
  }

  /**
   * Address upsert
   */
  export type AddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The filter to search for the Address to update in case it exists.
     */
    where: AddressWhereUniqueInput
    /**
     * In case the Address found by the `where` argument doesn't exist, create a new Address with this data.
     */
    create: XOR<AddressCreateInput, AddressUncheckedCreateInput>
    /**
     * In case the Address was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
  }

  /**
   * Address delete
   */
  export type AddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter which Address to delete.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address deleteMany
   */
  export type AddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Addresses to delete
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to delete.
     */
    limit?: number
  }

  /**
   * Address.orders
   */
  export type Address$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Address without action
   */
  export type AddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    totalAmount: number | null
    discountAmount: number | null
    paidAmount: number | null
    courierId: number | null
    shippingAmount: number | null
    invoiceSequenceNumber: number | null
    deliveryCharge: number | null
    roundedOffAmount: number | null
    invoiceAmount: number | null
  }

  export type OrderSumAggregateOutputType = {
    totalAmount: number | null
    discountAmount: number | null
    paidAmount: number | null
    courierId: number | null
    shippingAmount: number | null
    invoiceSequenceNumber: number | null
    deliveryCharge: number | null
    roundedOffAmount: number | null
    invoiceAmount: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    orderBy: string | null
    orderDate: Date | null
    status: $Enums.OrderStatus | null
    totalAmount: number | null
    discountAmount: number | null
    paidAmount: number | null
    packed: boolean | null
    refund: boolean | null
    customOrder: boolean | null
    r_orderId: string | null
    r_paymentId: string | null
    paymentLinkUrl: string | null
    paymentMethod: string | null
    paymentBank: string | null
    paymentVpa: string | null
    courierId: number | null
    shippingId: string | null
    shippingOrderId: string | null
    shippingAmount: number | null
    awsCode: string | null
    shippingInvoiceNumber: string | null
    shippingCourierName: string | null
    estimatedDeliveryDate: string | null
    pickupScheduled: Date | null
    deliveredAt: Date | null
    manifestGenerated: boolean | null
    InvoiceNumber: string | null
    invoiceType: string | null
    invoiceSequenceNumber: number | null
    deliveryCharge: number | null
    deliveryPartner: string | null
    deliveryPartnerName: string | null
    roundedOffAmount: number | null
    invoiceAmount: number | null
    refundId: string | null
    refundReceipt: string | null
    refundArn: string | null
    refundCreatedAt: Date | null
    isDifferentSupplier: boolean | null
    supplierId: string | null
    shippingAddressId: string | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    orderBy: string | null
    orderDate: Date | null
    status: $Enums.OrderStatus | null
    totalAmount: number | null
    discountAmount: number | null
    paidAmount: number | null
    packed: boolean | null
    refund: boolean | null
    customOrder: boolean | null
    r_orderId: string | null
    r_paymentId: string | null
    paymentLinkUrl: string | null
    paymentMethod: string | null
    paymentBank: string | null
    paymentVpa: string | null
    courierId: number | null
    shippingId: string | null
    shippingOrderId: string | null
    shippingAmount: number | null
    awsCode: string | null
    shippingInvoiceNumber: string | null
    shippingCourierName: string | null
    estimatedDeliveryDate: string | null
    pickupScheduled: Date | null
    deliveredAt: Date | null
    manifestGenerated: boolean | null
    InvoiceNumber: string | null
    invoiceType: string | null
    invoiceSequenceNumber: number | null
    deliveryCharge: number | null
    deliveryPartner: string | null
    deliveryPartnerName: string | null
    roundedOffAmount: number | null
    invoiceAmount: number | null
    refundId: string | null
    refundReceipt: string | null
    refundArn: string | null
    refundCreatedAt: Date | null
    isDifferentSupplier: boolean | null
    supplierId: string | null
    shippingAddressId: string | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    orderBy: number
    orderDate: number
    status: number
    totalAmount: number
    discountAmount: number
    paidAmount: number
    packed: number
    refund: number
    customOrder: number
    r_orderId: number
    r_paymentId: number
    paymentLinkUrl: number
    paymentMethod: number
    paymentBank: number
    paymentVpa: number
    courierId: number
    shippingId: number
    shippingOrderId: number
    shippingAmount: number
    awsCode: number
    shippingInvoiceNumber: number
    shippingCourierName: number
    estimatedDeliveryDate: number
    pickupScheduled: number
    deliveredAt: number
    manifestGenerated: number
    InvoiceNumber: number
    invoiceType: number
    invoiceSequenceNumber: number
    deliveryCharge: number
    deliveryPartner: number
    deliveryPartnerName: number
    roundedOffAmount: number
    invoiceAmount: number
    refundId: number
    refundReceipt: number
    refundArn: number
    refundCreatedAt: number
    isDifferentSupplier: number
    supplierId: number
    shippingAddressId: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    totalAmount?: true
    discountAmount?: true
    paidAmount?: true
    courierId?: true
    shippingAmount?: true
    invoiceSequenceNumber?: true
    deliveryCharge?: true
    roundedOffAmount?: true
    invoiceAmount?: true
  }

  export type OrderSumAggregateInputType = {
    totalAmount?: true
    discountAmount?: true
    paidAmount?: true
    courierId?: true
    shippingAmount?: true
    invoiceSequenceNumber?: true
    deliveryCharge?: true
    roundedOffAmount?: true
    invoiceAmount?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    orderBy?: true
    orderDate?: true
    status?: true
    totalAmount?: true
    discountAmount?: true
    paidAmount?: true
    packed?: true
    refund?: true
    customOrder?: true
    r_orderId?: true
    r_paymentId?: true
    paymentLinkUrl?: true
    paymentMethod?: true
    paymentBank?: true
    paymentVpa?: true
    courierId?: true
    shippingId?: true
    shippingOrderId?: true
    shippingAmount?: true
    awsCode?: true
    shippingInvoiceNumber?: true
    shippingCourierName?: true
    estimatedDeliveryDate?: true
    pickupScheduled?: true
    deliveredAt?: true
    manifestGenerated?: true
    InvoiceNumber?: true
    invoiceType?: true
    invoiceSequenceNumber?: true
    deliveryCharge?: true
    deliveryPartner?: true
    deliveryPartnerName?: true
    roundedOffAmount?: true
    invoiceAmount?: true
    refundId?: true
    refundReceipt?: true
    refundArn?: true
    refundCreatedAt?: true
    isDifferentSupplier?: true
    supplierId?: true
    shippingAddressId?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    orderBy?: true
    orderDate?: true
    status?: true
    totalAmount?: true
    discountAmount?: true
    paidAmount?: true
    packed?: true
    refund?: true
    customOrder?: true
    r_orderId?: true
    r_paymentId?: true
    paymentLinkUrl?: true
    paymentMethod?: true
    paymentBank?: true
    paymentVpa?: true
    courierId?: true
    shippingId?: true
    shippingOrderId?: true
    shippingAmount?: true
    awsCode?: true
    shippingInvoiceNumber?: true
    shippingCourierName?: true
    estimatedDeliveryDate?: true
    pickupScheduled?: true
    deliveredAt?: true
    manifestGenerated?: true
    InvoiceNumber?: true
    invoiceType?: true
    invoiceSequenceNumber?: true
    deliveryCharge?: true
    deliveryPartner?: true
    deliveryPartnerName?: true
    roundedOffAmount?: true
    invoiceAmount?: true
    refundId?: true
    refundReceipt?: true
    refundArn?: true
    refundCreatedAt?: true
    isDifferentSupplier?: true
    supplierId?: true
    shippingAddressId?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    orderBy?: true
    orderDate?: true
    status?: true
    totalAmount?: true
    discountAmount?: true
    paidAmount?: true
    packed?: true
    refund?: true
    customOrder?: true
    r_orderId?: true
    r_paymentId?: true
    paymentLinkUrl?: true
    paymentMethod?: true
    paymentBank?: true
    paymentVpa?: true
    courierId?: true
    shippingId?: true
    shippingOrderId?: true
    shippingAmount?: true
    awsCode?: true
    shippingInvoiceNumber?: true
    shippingCourierName?: true
    estimatedDeliveryDate?: true
    pickupScheduled?: true
    deliveredAt?: true
    manifestGenerated?: true
    InvoiceNumber?: true
    invoiceType?: true
    invoiceSequenceNumber?: true
    deliveryCharge?: true
    deliveryPartner?: true
    deliveryPartnerName?: true
    roundedOffAmount?: true
    invoiceAmount?: true
    refundId?: true
    refundReceipt?: true
    refundArn?: true
    refundCreatedAt?: true
    isDifferentSupplier?: true
    supplierId?: true
    shippingAddressId?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    orderBy: string
    orderDate: Date
    status: $Enums.OrderStatus
    totalAmount: number
    discountAmount: number | null
    paidAmount: number | null
    packed: boolean
    refund: boolean
    customOrder: boolean
    r_orderId: string | null
    r_paymentId: string | null
    paymentLinkUrl: string | null
    paymentMethod: string | null
    paymentBank: string | null
    paymentVpa: string | null
    courierId: number | null
    shippingId: string | null
    shippingOrderId: string | null
    shippingAmount: number | null
    awsCode: string | null
    shippingInvoiceNumber: string | null
    shippingCourierName: string | null
    estimatedDeliveryDate: string | null
    pickupScheduled: Date | null
    deliveredAt: Date | null
    manifestGenerated: boolean | null
    InvoiceNumber: string | null
    invoiceType: string | null
    invoiceSequenceNumber: number | null
    deliveryCharge: number | null
    deliveryPartner: string | null
    deliveryPartnerName: string | null
    roundedOffAmount: number | null
    invoiceAmount: number | null
    refundId: string | null
    refundReceipt: string | null
    refundArn: string | null
    refundCreatedAt: Date | null
    isDifferentSupplier: boolean | null
    supplierId: string | null
    shippingAddressId: string | null
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderBy?: boolean
    orderDate?: boolean
    status?: boolean
    totalAmount?: boolean
    discountAmount?: boolean
    paidAmount?: boolean
    packed?: boolean
    refund?: boolean
    customOrder?: boolean
    r_orderId?: boolean
    r_paymentId?: boolean
    paymentLinkUrl?: boolean
    paymentMethod?: boolean
    paymentBank?: boolean
    paymentVpa?: boolean
    courierId?: boolean
    shippingId?: boolean
    shippingOrderId?: boolean
    shippingAmount?: boolean
    awsCode?: boolean
    shippingInvoiceNumber?: boolean
    shippingCourierName?: boolean
    estimatedDeliveryDate?: boolean
    pickupScheduled?: boolean
    deliveredAt?: boolean
    manifestGenerated?: boolean
    InvoiceNumber?: boolean
    invoiceType?: boolean
    invoiceSequenceNumber?: boolean
    deliveryCharge?: boolean
    deliveryPartner?: boolean
    deliveryPartnerName?: boolean
    roundedOffAmount?: boolean
    invoiceAmount?: boolean
    refundId?: boolean
    refundReceipt?: boolean
    refundArn?: boolean
    refundCreatedAt?: boolean
    isDifferentSupplier?: boolean
    supplierId?: boolean
    shippingAddressId?: boolean
    supplier?: boolean | Order$supplierArgs<ExtArgs>
    orderItems?: boolean | Order$orderItemsArgs<ExtArgs>
    shippingAddress?: boolean | Order$shippingAddressArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>



  export type OrderSelectScalar = {
    id?: boolean
    orderBy?: boolean
    orderDate?: boolean
    status?: boolean
    totalAmount?: boolean
    discountAmount?: boolean
    paidAmount?: boolean
    packed?: boolean
    refund?: boolean
    customOrder?: boolean
    r_orderId?: boolean
    r_paymentId?: boolean
    paymentLinkUrl?: boolean
    paymentMethod?: boolean
    paymentBank?: boolean
    paymentVpa?: boolean
    courierId?: boolean
    shippingId?: boolean
    shippingOrderId?: boolean
    shippingAmount?: boolean
    awsCode?: boolean
    shippingInvoiceNumber?: boolean
    shippingCourierName?: boolean
    estimatedDeliveryDate?: boolean
    pickupScheduled?: boolean
    deliveredAt?: boolean
    manifestGenerated?: boolean
    InvoiceNumber?: boolean
    invoiceType?: boolean
    invoiceSequenceNumber?: boolean
    deliveryCharge?: boolean
    deliveryPartner?: boolean
    deliveryPartnerName?: boolean
    roundedOffAmount?: boolean
    invoiceAmount?: boolean
    refundId?: boolean
    refundReceipt?: boolean
    refundArn?: boolean
    refundCreatedAt?: boolean
    isDifferentSupplier?: boolean
    supplierId?: boolean
    shippingAddressId?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderBy" | "orderDate" | "status" | "totalAmount" | "discountAmount" | "paidAmount" | "packed" | "refund" | "customOrder" | "r_orderId" | "r_paymentId" | "paymentLinkUrl" | "paymentMethod" | "paymentBank" | "paymentVpa" | "courierId" | "shippingId" | "shippingOrderId" | "shippingAmount" | "awsCode" | "shippingInvoiceNumber" | "shippingCourierName" | "estimatedDeliveryDate" | "pickupScheduled" | "deliveredAt" | "manifestGenerated" | "InvoiceNumber" | "invoiceType" | "invoiceSequenceNumber" | "deliveryCharge" | "deliveryPartner" | "deliveryPartnerName" | "roundedOffAmount" | "invoiceAmount" | "refundId" | "refundReceipt" | "refundArn" | "refundCreatedAt" | "isDifferentSupplier" | "supplierId" | "shippingAddressId", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplier?: boolean | Order$supplierArgs<ExtArgs>
    orderItems?: boolean | Order$orderItemsArgs<ExtArgs>
    shippingAddress?: boolean | Order$shippingAddressArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      supplier: Prisma.$SupplierPayload<ExtArgs> | null
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[]
      shippingAddress: Prisma.$AddressPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderBy: string
      orderDate: Date
      status: $Enums.OrderStatus
      totalAmount: number
      discountAmount: number | null
      paidAmount: number | null
      packed: boolean
      refund: boolean
      customOrder: boolean
      r_orderId: string | null
      r_paymentId: string | null
      paymentLinkUrl: string | null
      paymentMethod: string | null
      paymentBank: string | null
      paymentVpa: string | null
      courierId: number | null
      shippingId: string | null
      shippingOrderId: string | null
      shippingAmount: number | null
      awsCode: string | null
      shippingInvoiceNumber: string | null
      shippingCourierName: string | null
      estimatedDeliveryDate: string | null
      pickupScheduled: Date | null
      deliveredAt: Date | null
      manifestGenerated: boolean | null
      InvoiceNumber: string | null
      invoiceType: string | null
      invoiceSequenceNumber: number | null
      deliveryCharge: number | null
      deliveryPartner: string | null
      deliveryPartnerName: string | null
      roundedOffAmount: number | null
      invoiceAmount: number | null
      refundId: string | null
      refundReceipt: string | null
      refundArn: string | null
      refundCreatedAt: Date | null
      isDifferentSupplier: boolean | null
      supplierId: string | null
      shippingAddressId: string | null
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
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
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    supplier<T extends Order$supplierArgs<ExtArgs> = {}>(args?: Subset<T, Order$supplierArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    orderItems<T extends Order$orderItemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$orderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    shippingAddress<T extends Order$shippingAddressArgs<ExtArgs> = {}>(args?: Subset<T, Order$shippingAddressArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly orderBy: FieldRef<"Order", 'String'>
    readonly orderDate: FieldRef<"Order", 'DateTime'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly totalAmount: FieldRef<"Order", 'Float'>
    readonly discountAmount: FieldRef<"Order", 'Float'>
    readonly paidAmount: FieldRef<"Order", 'Float'>
    readonly packed: FieldRef<"Order", 'Boolean'>
    readonly refund: FieldRef<"Order", 'Boolean'>
    readonly customOrder: FieldRef<"Order", 'Boolean'>
    readonly r_orderId: FieldRef<"Order", 'String'>
    readonly r_paymentId: FieldRef<"Order", 'String'>
    readonly paymentLinkUrl: FieldRef<"Order", 'String'>
    readonly paymentMethod: FieldRef<"Order", 'String'>
    readonly paymentBank: FieldRef<"Order", 'String'>
    readonly paymentVpa: FieldRef<"Order", 'String'>
    readonly courierId: FieldRef<"Order", 'Int'>
    readonly shippingId: FieldRef<"Order", 'String'>
    readonly shippingOrderId: FieldRef<"Order", 'String'>
    readonly shippingAmount: FieldRef<"Order", 'Float'>
    readonly awsCode: FieldRef<"Order", 'String'>
    readonly shippingInvoiceNumber: FieldRef<"Order", 'String'>
    readonly shippingCourierName: FieldRef<"Order", 'String'>
    readonly estimatedDeliveryDate: FieldRef<"Order", 'String'>
    readonly pickupScheduled: FieldRef<"Order", 'DateTime'>
    readonly deliveredAt: FieldRef<"Order", 'DateTime'>
    readonly manifestGenerated: FieldRef<"Order", 'Boolean'>
    readonly InvoiceNumber: FieldRef<"Order", 'String'>
    readonly invoiceType: FieldRef<"Order", 'String'>
    readonly invoiceSequenceNumber: FieldRef<"Order", 'Int'>
    readonly deliveryCharge: FieldRef<"Order", 'Float'>
    readonly deliveryPartner: FieldRef<"Order", 'String'>
    readonly deliveryPartnerName: FieldRef<"Order", 'String'>
    readonly roundedOffAmount: FieldRef<"Order", 'Float'>
    readonly invoiceAmount: FieldRef<"Order", 'Float'>
    readonly refundId: FieldRef<"Order", 'String'>
    readonly refundReceipt: FieldRef<"Order", 'String'>
    readonly refundArn: FieldRef<"Order", 'String'>
    readonly refundCreatedAt: FieldRef<"Order", 'DateTime'>
    readonly isDifferentSupplier: FieldRef<"Order", 'Boolean'>
    readonly supplierId: FieldRef<"Order", 'String'>
    readonly shippingAddressId: FieldRef<"Order", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.supplier
   */
  export type Order$supplierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    where?: SupplierWhereInput
  }

  /**
   * Order.orderItems
   */
  export type Order$orderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order.shippingAddress
   */
  export type Order$shippingAddressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    quantity: number | null
    price: number | null
    discount: number | null
    tax: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    quantity: number | null
    price: number | null
    discount: number | null
    tax: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    quantity: number | null
    price: number | null
    discount: number | null
    tax: number | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    quantity: number | null
    price: number | null
    discount: number | null
    tax: number | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    productId: number
    quantity: number
    price: number
    discount: number
    tax: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    quantity?: true
    price?: true
    discount?: true
    tax?: true
  }

  export type OrderItemSumAggregateInputType = {
    quantity?: true
    price?: true
    discount?: true
    tax?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    price?: true
    discount?: true
    tax?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    price?: true
    discount?: true
    tax?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    price?: true
    discount?: true
    tax?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: string
    orderId: string
    productId: string
    quantity: number
    price: number
    discount: number
    tax: number
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    price?: boolean
    discount?: boolean
    tax?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>



  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    price?: boolean
    discount?: boolean
    tax?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "productId" | "quantity" | "price" | "discount" | "tax", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      productId: string
      quantity: number
      price: number
      discount: number
      tax: number
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
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
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'String'>
    readonly orderId: FieldRef<"OrderItem", 'String'>
    readonly productId: FieldRef<"OrderItem", 'String'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly price: FieldRef<"OrderItem", 'Float'>
    readonly discount: FieldRef<"OrderItem", 'Float'>
    readonly tax: FieldRef<"OrderItem", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model PasswordReset
   */

  export type AggregatePasswordReset = {
    _count: PasswordResetCountAggregateOutputType | null
    _min: PasswordResetMinAggregateOutputType | null
    _max: PasswordResetMaxAggregateOutputType | null
  }

  export type PasswordResetMinAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetMaxAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type PasswordResetCountAggregateOutputType = {
    id: number
    token: number
    userId: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type PasswordResetMinAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type PasswordResetMaxAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type PasswordResetCountAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type PasswordResetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordReset to aggregate.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResets
    **/
    _count?: true | PasswordResetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetMaxAggregateInputType
  }

  export type GetPasswordResetAggregateType<T extends PasswordResetAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordReset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordReset[P]>
      : GetScalarType<T[P], AggregatePasswordReset[P]>
  }




  export type PasswordResetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetWhereInput
    orderBy?: PasswordResetOrderByWithAggregationInput | PasswordResetOrderByWithAggregationInput[]
    by: PasswordResetScalarFieldEnum[] | PasswordResetScalarFieldEnum
    having?: PasswordResetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetCountAggregateInputType | true
    _min?: PasswordResetMinAggregateInputType
    _max?: PasswordResetMaxAggregateInputType
  }

  export type PasswordResetGroupByOutputType = {
    id: string
    token: string
    userId: string
    expiresAt: Date
    createdAt: Date
    _count: PasswordResetCountAggregateOutputType | null
    _min: PasswordResetMinAggregateOutputType | null
    _max: PasswordResetMaxAggregateOutputType | null
  }

  type GetPasswordResetGroupByPayload<T extends PasswordResetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordReset"]>



  export type PasswordResetSelectScalar = {
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type PasswordResetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "userId" | "expiresAt" | "createdAt", ExtArgs["result"]["passwordReset"]>
  export type PasswordResetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordResetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordReset"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      userId: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["passwordReset"]>
    composites: {}
  }

  type PasswordResetGetPayload<S extends boolean | null | undefined | PasswordResetDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetPayload, S>

  type PasswordResetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetCountAggregateInputType | true
    }

  export interface PasswordResetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordReset'], meta: { name: 'PasswordReset' } }
    /**
     * Find zero or one PasswordReset that matches the filter.
     * @param {PasswordResetFindUniqueArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetFindUniqueArgs>(args: SelectSubset<T, PasswordResetFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordReset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetFindUniqueOrThrowArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordReset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindFirstArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetFindFirstArgs>(args?: SelectSubset<T, PasswordResetFindFirstArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordReset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindFirstOrThrowArgs} args - Arguments to find a PasswordReset
     * @example
     * // Get one PasswordReset
     * const passwordReset = await prisma.passwordReset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResets
     * const passwordResets = await prisma.passwordReset.findMany()
     * 
     * // Get first 10 PasswordResets
     * const passwordResets = await prisma.passwordReset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetWithIdOnly = await prisma.passwordReset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetFindManyArgs>(args?: SelectSubset<T, PasswordResetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordReset.
     * @param {PasswordResetCreateArgs} args - Arguments to create a PasswordReset.
     * @example
     * // Create one PasswordReset
     * const PasswordReset = await prisma.passwordReset.create({
     *   data: {
     *     // ... data to create a PasswordReset
     *   }
     * })
     * 
     */
    create<T extends PasswordResetCreateArgs>(args: SelectSubset<T, PasswordResetCreateArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResets.
     * @param {PasswordResetCreateManyArgs} args - Arguments to create many PasswordResets.
     * @example
     * // Create many PasswordResets
     * const passwordReset = await prisma.passwordReset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetCreateManyArgs>(args?: SelectSubset<T, PasswordResetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PasswordReset.
     * @param {PasswordResetDeleteArgs} args - Arguments to delete one PasswordReset.
     * @example
     * // Delete one PasswordReset
     * const PasswordReset = await prisma.passwordReset.delete({
     *   where: {
     *     // ... filter to delete one PasswordReset
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetDeleteArgs>(args: SelectSubset<T, PasswordResetDeleteArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordReset.
     * @param {PasswordResetUpdateArgs} args - Arguments to update one PasswordReset.
     * @example
     * // Update one PasswordReset
     * const passwordReset = await prisma.passwordReset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetUpdateArgs>(args: SelectSubset<T, PasswordResetUpdateArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResets.
     * @param {PasswordResetDeleteManyArgs} args - Arguments to filter PasswordResets to delete.
     * @example
     * // Delete a few PasswordResets
     * const { count } = await prisma.passwordReset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetDeleteManyArgs>(args?: SelectSubset<T, PasswordResetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResets
     * const passwordReset = await prisma.passwordReset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetUpdateManyArgs>(args: SelectSubset<T, PasswordResetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PasswordReset.
     * @param {PasswordResetUpsertArgs} args - Arguments to update or create a PasswordReset.
     * @example
     * // Update or create a PasswordReset
     * const passwordReset = await prisma.passwordReset.upsert({
     *   create: {
     *     // ... data to create a PasswordReset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordReset we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetUpsertArgs>(args: SelectSubset<T, PasswordResetUpsertArgs<ExtArgs>>): Prisma__PasswordResetClient<$Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetCountArgs} args - Arguments to filter PasswordResets to count.
     * @example
     * // Count the number of PasswordResets
     * const count = await prisma.passwordReset.count({
     *   where: {
     *     // ... the filter for the PasswordResets we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetCountArgs>(
      args?: Subset<T, PasswordResetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordReset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PasswordResetAggregateArgs>(args: Subset<T, PasswordResetAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetAggregateType<T>>

    /**
     * Group by PasswordReset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetGroupByArgs} args - Group by arguments.
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
      T extends PasswordResetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PasswordResetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordReset model
   */
  readonly fields: PasswordResetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordReset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PasswordReset model
   */
  interface PasswordResetFieldRefs {
    readonly id: FieldRef<"PasswordReset", 'String'>
    readonly token: FieldRef<"PasswordReset", 'String'>
    readonly userId: FieldRef<"PasswordReset", 'String'>
    readonly expiresAt: FieldRef<"PasswordReset", 'DateTime'>
    readonly createdAt: FieldRef<"PasswordReset", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordReset findUnique
   */
  export type PasswordResetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset findUniqueOrThrow
   */
  export type PasswordResetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset findFirst
   */
  export type PasswordResetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResets.
     */
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset findFirstOrThrow
   */
  export type PasswordResetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordReset to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResets.
     */
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset findMany
   */
  export type PasswordResetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResets to fetch.
     */
    where?: PasswordResetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResets to fetch.
     */
    orderBy?: PasswordResetOrderByWithRelationInput | PasswordResetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResets.
     */
    cursor?: PasswordResetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResets.
     */
    skip?: number
    distinct?: PasswordResetScalarFieldEnum | PasswordResetScalarFieldEnum[]
  }

  /**
   * PasswordReset create
   */
  export type PasswordResetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordReset.
     */
    data: XOR<PasswordResetCreateInput, PasswordResetUncheckedCreateInput>
  }

  /**
   * PasswordReset createMany
   */
  export type PasswordResetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResets.
     */
    data: PasswordResetCreateManyInput | PasswordResetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordReset update
   */
  export type PasswordResetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordReset.
     */
    data: XOR<PasswordResetUpdateInput, PasswordResetUncheckedUpdateInput>
    /**
     * Choose, which PasswordReset to update.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset updateMany
   */
  export type PasswordResetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResets.
     */
    data: XOR<PasswordResetUpdateManyMutationInput, PasswordResetUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResets to update
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to update.
     */
    limit?: number
  }

  /**
   * PasswordReset upsert
   */
  export type PasswordResetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordReset to update in case it exists.
     */
    where: PasswordResetWhereUniqueInput
    /**
     * In case the PasswordReset found by the `where` argument doesn't exist, create a new PasswordReset with this data.
     */
    create: XOR<PasswordResetCreateInput, PasswordResetUncheckedCreateInput>
    /**
     * In case the PasswordReset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetUpdateInput, PasswordResetUncheckedUpdateInput>
  }

  /**
   * PasswordReset delete
   */
  export type PasswordResetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
    /**
     * Filter which PasswordReset to delete.
     */
    where: PasswordResetWhereUniqueInput
  }

  /**
   * PasswordReset deleteMany
   */
  export type PasswordResetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResets to delete
     */
    where?: PasswordResetWhereInput
    /**
     * Limit how many PasswordResets to delete.
     */
    limit?: number
  }

  /**
   * PasswordReset without action
   */
  export type PasswordResetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordReset
     */
    select?: PasswordResetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordReset
     */
    omit?: PasswordResetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetInclude<ExtArgs> | null
  }


  /**
   * Model Contact
   */

  export type AggregateContact = {
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  export type ContactMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phoneNumber: string | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phoneNumber: string | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    phoneNumber: number
    message: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ContactMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phoneNumber?: true
    message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phoneNumber?: true
    message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phoneNumber?: true
    message?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ContactAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contact to aggregate.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contacts
    **/
    _count?: true | ContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMaxAggregateInputType
  }

  export type GetContactAggregateType<T extends ContactAggregateArgs> = {
        [P in keyof T & keyof AggregateContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContact[P]>
      : GetScalarType<T[P], AggregateContact[P]>
  }




  export type ContactGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactWhereInput
    orderBy?: ContactOrderByWithAggregationInput | ContactOrderByWithAggregationInput[]
    by: ContactScalarFieldEnum[] | ContactScalarFieldEnum
    having?: ContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactCountAggregateInputType | true
    _min?: ContactMinAggregateInputType
    _max?: ContactMaxAggregateInputType
  }

  export type ContactGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    message: string
    createdAt: Date
    updatedAt: Date
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  type GetContactGroupByPayload<T extends ContactGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactGroupByOutputType[P]>
            : GetScalarType<T[P], ContactGroupByOutputType[P]>
        }
      >
    >


  export type ContactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phoneNumber?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["contact"]>



  export type ContactSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phoneNumber?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ContactOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "phoneNumber" | "message" | "createdAt" | "updatedAt", ExtArgs["result"]["contact"]>

  export type $ContactPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contact"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      email: string
      phoneNumber: string
      message: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["contact"]>
    composites: {}
  }

  type ContactGetPayload<S extends boolean | null | undefined | ContactDefaultArgs> = $Result.GetResult<Prisma.$ContactPayload, S>

  type ContactCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactCountAggregateInputType | true
    }

  export interface ContactDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contact'], meta: { name: 'Contact' } }
    /**
     * Find zero or one Contact that matches the filter.
     * @param {ContactFindUniqueArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactFindUniqueArgs>(args: SelectSubset<T, ContactFindUniqueArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contact that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactFindUniqueOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactFindFirstArgs>(args?: SelectSubset<T, ContactFindFirstArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contacts
     * const contacts = await prisma.contact.findMany()
     * 
     * // Get first 10 Contacts
     * const contacts = await prisma.contact.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactWithIdOnly = await prisma.contact.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactFindManyArgs>(args?: SelectSubset<T, ContactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contact.
     * @param {ContactCreateArgs} args - Arguments to create a Contact.
     * @example
     * // Create one Contact
     * const Contact = await prisma.contact.create({
     *   data: {
     *     // ... data to create a Contact
     *   }
     * })
     * 
     */
    create<T extends ContactCreateArgs>(args: SelectSubset<T, ContactCreateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contacts.
     * @param {ContactCreateManyArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactCreateManyArgs>(args?: SelectSubset<T, ContactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Contact.
     * @param {ContactDeleteArgs} args - Arguments to delete one Contact.
     * @example
     * // Delete one Contact
     * const Contact = await prisma.contact.delete({
     *   where: {
     *     // ... filter to delete one Contact
     *   }
     * })
     * 
     */
    delete<T extends ContactDeleteArgs>(args: SelectSubset<T, ContactDeleteArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contact.
     * @param {ContactUpdateArgs} args - Arguments to update one Contact.
     * @example
     * // Update one Contact
     * const contact = await prisma.contact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactUpdateArgs>(args: SelectSubset<T, ContactUpdateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contacts.
     * @param {ContactDeleteManyArgs} args - Arguments to filter Contacts to delete.
     * @example
     * // Delete a few Contacts
     * const { count } = await prisma.contact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactDeleteManyArgs>(args?: SelectSubset<T, ContactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactUpdateManyArgs>(args: SelectSubset<T, ContactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Contact.
     * @param {ContactUpsertArgs} args - Arguments to update or create a Contact.
     * @example
     * // Update or create a Contact
     * const contact = await prisma.contact.upsert({
     *   create: {
     *     // ... data to create a Contact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contact we want to update
     *   }
     * })
     */
    upsert<T extends ContactUpsertArgs>(args: SelectSubset<T, ContactUpsertArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactCountArgs} args - Arguments to filter Contacts to count.
     * @example
     * // Count the number of Contacts
     * const count = await prisma.contact.count({
     *   where: {
     *     // ... the filter for the Contacts we want to count
     *   }
     * })
    **/
    count<T extends ContactCountArgs>(
      args?: Subset<T, ContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContactAggregateArgs>(args: Subset<T, ContactAggregateArgs>): Prisma.PrismaPromise<GetContactAggregateType<T>>

    /**
     * Group by Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactGroupByArgs} args - Group by arguments.
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
      T extends ContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactGroupByArgs['orderBy'] }
        : { orderBy?: ContactGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contact model
   */
  readonly fields: ContactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Contact model
   */
  interface ContactFieldRefs {
    readonly id: FieldRef<"Contact", 'String'>
    readonly firstName: FieldRef<"Contact", 'String'>
    readonly lastName: FieldRef<"Contact", 'String'>
    readonly email: FieldRef<"Contact", 'String'>
    readonly phoneNumber: FieldRef<"Contact", 'String'>
    readonly message: FieldRef<"Contact", 'String'>
    readonly createdAt: FieldRef<"Contact", 'DateTime'>
    readonly updatedAt: FieldRef<"Contact", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Contact findUnique
   */
  export type ContactFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findUniqueOrThrow
   */
  export type ContactFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findFirst
   */
  export type ContactFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findFirstOrThrow
   */
  export type ContactFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findMany
   */
  export type ContactFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Filter, which Contacts to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact create
   */
  export type ContactCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data needed to create a Contact.
     */
    data: XOR<ContactCreateInput, ContactUncheckedCreateInput>
  }

  /**
   * Contact createMany
   */
  export type ContactCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contact update
   */
  export type ContactUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data needed to update a Contact.
     */
    data: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
    /**
     * Choose, which Contact to update.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact updateMany
   */
  export type ContactUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to update.
     */
    limit?: number
  }

  /**
   * Contact upsert
   */
  export type ContactUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The filter to search for the Contact to update in case it exists.
     */
    where: ContactWhereUniqueInput
    /**
     * In case the Contact found by the `where` argument doesn't exist, create a new Contact with this data.
     */
    create: XOR<ContactCreateInput, ContactUncheckedCreateInput>
    /**
     * In case the Contact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
  }

  /**
   * Contact delete
   */
  export type ContactDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Filter which Contact to delete.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact deleteMany
   */
  export type ContactDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contacts to delete
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to delete.
     */
    limit?: number
  }

  /**
   * Contact without action
   */
  export type ContactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
  }


  /**
   * Model Feedback
   */

  export type AggregateFeedback = {
    _count: FeedbackCountAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  export type FeedbackMinAggregateOutputType = {
    id: string | null
    message: string | null
    createdAt: Date | null
  }

  export type FeedbackMaxAggregateOutputType = {
    id: string | null
    message: string | null
    createdAt: Date | null
  }

  export type FeedbackCountAggregateOutputType = {
    id: number
    message: number
    createdAt: number
    _all: number
  }


  export type FeedbackMinAggregateInputType = {
    id?: true
    message?: true
    createdAt?: true
  }

  export type FeedbackMaxAggregateInputType = {
    id?: true
    message?: true
    createdAt?: true
  }

  export type FeedbackCountAggregateInputType = {
    id?: true
    message?: true
    createdAt?: true
    _all?: true
  }

  export type FeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedback to aggregate.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Feedbacks
    **/
    _count?: true | FeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedbackMaxAggregateInputType
  }

  export type GetFeedbackAggregateType<T extends FeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedback[P]>
      : GetScalarType<T[P], AggregateFeedback[P]>
  }




  export type FeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackWhereInput
    orderBy?: FeedbackOrderByWithAggregationInput | FeedbackOrderByWithAggregationInput[]
    by: FeedbackScalarFieldEnum[] | FeedbackScalarFieldEnum
    having?: FeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedbackCountAggregateInputType | true
    _min?: FeedbackMinAggregateInputType
    _max?: FeedbackMaxAggregateInputType
  }

  export type FeedbackGroupByOutputType = {
    id: string
    message: string
    createdAt: Date
    _count: FeedbackCountAggregateOutputType | null
    _min: FeedbackMinAggregateOutputType | null
    _max: FeedbackMaxAggregateOutputType | null
  }

  type GetFeedbackGroupByPayload<T extends FeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], FeedbackGroupByOutputType[P]>
        }
      >
    >


  export type FeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["feedback"]>



  export type FeedbackSelectScalar = {
    id?: boolean
    message?: boolean
    createdAt?: boolean
  }

  export type FeedbackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "message" | "createdAt", ExtArgs["result"]["feedback"]>

  export type $FeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Feedback"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      message: string
      createdAt: Date
    }, ExtArgs["result"]["feedback"]>
    composites: {}
  }

  type FeedbackGetPayload<S extends boolean | null | undefined | FeedbackDefaultArgs> = $Result.GetResult<Prisma.$FeedbackPayload, S>

  type FeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedbackCountAggregateInputType | true
    }

  export interface FeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Feedback'], meta: { name: 'Feedback' } }
    /**
     * Find zero or one Feedback that matches the filter.
     * @param {FeedbackFindUniqueArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedbackFindUniqueArgs>(args: SelectSubset<T, FeedbackFindUniqueArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Feedback that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedbackFindUniqueOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedbackFindFirstArgs>(args?: SelectSubset<T, FeedbackFindFirstArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Feedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindFirstOrThrowArgs} args - Arguments to find a Feedback
     * @example
     * // Get one Feedback
     * const feedback = await prisma.feedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Feedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Feedbacks
     * const feedbacks = await prisma.feedback.findMany()
     * 
     * // Get first 10 Feedbacks
     * const feedbacks = await prisma.feedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedbackWithIdOnly = await prisma.feedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedbackFindManyArgs>(args?: SelectSubset<T, FeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Feedback.
     * @param {FeedbackCreateArgs} args - Arguments to create a Feedback.
     * @example
     * // Create one Feedback
     * const Feedback = await prisma.feedback.create({
     *   data: {
     *     // ... data to create a Feedback
     *   }
     * })
     * 
     */
    create<T extends FeedbackCreateArgs>(args: SelectSubset<T, FeedbackCreateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Feedbacks.
     * @param {FeedbackCreateManyArgs} args - Arguments to create many Feedbacks.
     * @example
     * // Create many Feedbacks
     * const feedback = await prisma.feedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedbackCreateManyArgs>(args?: SelectSubset<T, FeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Feedback.
     * @param {FeedbackDeleteArgs} args - Arguments to delete one Feedback.
     * @example
     * // Delete one Feedback
     * const Feedback = await prisma.feedback.delete({
     *   where: {
     *     // ... filter to delete one Feedback
     *   }
     * })
     * 
     */
    delete<T extends FeedbackDeleteArgs>(args: SelectSubset<T, FeedbackDeleteArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Feedback.
     * @param {FeedbackUpdateArgs} args - Arguments to update one Feedback.
     * @example
     * // Update one Feedback
     * const feedback = await prisma.feedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedbackUpdateArgs>(args: SelectSubset<T, FeedbackUpdateArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Feedbacks.
     * @param {FeedbackDeleteManyArgs} args - Arguments to filter Feedbacks to delete.
     * @example
     * // Delete a few Feedbacks
     * const { count } = await prisma.feedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedbackDeleteManyArgs>(args?: SelectSubset<T, FeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Feedbacks
     * const feedback = await prisma.feedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedbackUpdateManyArgs>(args: SelectSubset<T, FeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Feedback.
     * @param {FeedbackUpsertArgs} args - Arguments to update or create a Feedback.
     * @example
     * // Update or create a Feedback
     * const feedback = await prisma.feedback.upsert({
     *   create: {
     *     // ... data to create a Feedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Feedback we want to update
     *   }
     * })
     */
    upsert<T extends FeedbackUpsertArgs>(args: SelectSubset<T, FeedbackUpsertArgs<ExtArgs>>): Prisma__FeedbackClient<$Result.GetResult<Prisma.$FeedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Feedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackCountArgs} args - Arguments to filter Feedbacks to count.
     * @example
     * // Count the number of Feedbacks
     * const count = await prisma.feedback.count({
     *   where: {
     *     // ... the filter for the Feedbacks we want to count
     *   }
     * })
    **/
    count<T extends FeedbackCountArgs>(
      args?: Subset<T, FeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FeedbackAggregateArgs>(args: Subset<T, FeedbackAggregateArgs>): Prisma.PrismaPromise<GetFeedbackAggregateType<T>>

    /**
     * Group by Feedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackGroupByArgs} args - Group by arguments.
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
      T extends FeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedbackGroupByArgs['orderBy'] }
        : { orderBy?: FeedbackGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Feedback model
   */
  readonly fields: FeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Feedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Feedback model
   */
  interface FeedbackFieldRefs {
    readonly id: FieldRef<"Feedback", 'String'>
    readonly message: FieldRef<"Feedback", 'String'>
    readonly createdAt: FieldRef<"Feedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Feedback findUnique
   */
  export type FeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findUniqueOrThrow
   */
  export type FeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback findFirst
   */
  export type FeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findFirstOrThrow
   */
  export type FeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter, which Feedback to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Feedbacks.
     */
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback findMany
   */
  export type FeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter, which Feedbacks to fetch.
     */
    where?: FeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Feedbacks to fetch.
     */
    orderBy?: FeedbackOrderByWithRelationInput | FeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Feedbacks.
     */
    cursor?: FeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Feedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Feedbacks.
     */
    skip?: number
    distinct?: FeedbackScalarFieldEnum | FeedbackScalarFieldEnum[]
  }

  /**
   * Feedback create
   */
  export type FeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data needed to create a Feedback.
     */
    data: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
  }

  /**
   * Feedback createMany
   */
  export type FeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Feedbacks.
     */
    data: FeedbackCreateManyInput | FeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Feedback update
   */
  export type FeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The data needed to update a Feedback.
     */
    data: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
    /**
     * Choose, which Feedback to update.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback updateMany
   */
  export type FeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Feedbacks.
     */
    data: XOR<FeedbackUpdateManyMutationInput, FeedbackUncheckedUpdateManyInput>
    /**
     * Filter which Feedbacks to update
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to update.
     */
    limit?: number
  }

  /**
   * Feedback upsert
   */
  export type FeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * The filter to search for the Feedback to update in case it exists.
     */
    where: FeedbackWhereUniqueInput
    /**
     * In case the Feedback found by the `where` argument doesn't exist, create a new Feedback with this data.
     */
    create: XOR<FeedbackCreateInput, FeedbackUncheckedCreateInput>
    /**
     * In case the Feedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedbackUpdateInput, FeedbackUncheckedUpdateInput>
  }

  /**
   * Feedback delete
   */
  export type FeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
    /**
     * Filter which Feedback to delete.
     */
    where: FeedbackWhereUniqueInput
  }

  /**
   * Feedback deleteMany
   */
  export type FeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feedbacks to delete
     */
    where?: FeedbackWhereInput
    /**
     * Limit how many Feedbacks to delete.
     */
    limit?: number
  }

  /**
   * Feedback without action
   */
  export type FeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feedback
     */
    select?: FeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Feedback
     */
    omit?: FeedbackOmit<ExtArgs> | null
  }


  /**
   * Model Announcement
   */

  export type AggregateAnnouncement = {
    _count: AnnouncementCountAggregateOutputType | null
    _min: AnnouncementMinAggregateOutputType | null
    _max: AnnouncementMaxAggregateOutputType | null
  }

  export type AnnouncementMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnnouncementMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnnouncementCountAggregateOutputType = {
    id: number
    title: number
    content: number
    createdBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AnnouncementMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnnouncementMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnnouncementCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AnnouncementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Announcement to aggregate.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Announcements
    **/
    _count?: true | AnnouncementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnnouncementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnnouncementMaxAggregateInputType
  }

  export type GetAnnouncementAggregateType<T extends AnnouncementAggregateArgs> = {
        [P in keyof T & keyof AggregateAnnouncement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnnouncement[P]>
      : GetScalarType<T[P], AggregateAnnouncement[P]>
  }




  export type AnnouncementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnnouncementWhereInput
    orderBy?: AnnouncementOrderByWithAggregationInput | AnnouncementOrderByWithAggregationInput[]
    by: AnnouncementScalarFieldEnum[] | AnnouncementScalarFieldEnum
    having?: AnnouncementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnnouncementCountAggregateInputType | true
    _min?: AnnouncementMinAggregateInputType
    _max?: AnnouncementMaxAggregateInputType
  }

  export type AnnouncementGroupByOutputType = {
    id: string
    title: string
    content: string
    createdBy: string
    createdAt: Date
    updatedAt: Date
    _count: AnnouncementCountAggregateOutputType | null
    _min: AnnouncementMinAggregateOutputType | null
    _max: AnnouncementMaxAggregateOutputType | null
  }

  type GetAnnouncementGroupByPayload<T extends AnnouncementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnnouncementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnnouncementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnnouncementGroupByOutputType[P]>
            : GetScalarType<T[P], AnnouncementGroupByOutputType[P]>
        }
      >
    >


  export type AnnouncementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["announcement"]>



  export type AnnouncementSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AnnouncementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "createdBy" | "createdAt" | "updatedAt", ExtArgs["result"]["announcement"]>

  export type $AnnouncementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Announcement"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      createdBy: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["announcement"]>
    composites: {}
  }

  type AnnouncementGetPayload<S extends boolean | null | undefined | AnnouncementDefaultArgs> = $Result.GetResult<Prisma.$AnnouncementPayload, S>

  type AnnouncementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnnouncementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnnouncementCountAggregateInputType | true
    }

  export interface AnnouncementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Announcement'], meta: { name: 'Announcement' } }
    /**
     * Find zero or one Announcement that matches the filter.
     * @param {AnnouncementFindUniqueArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnnouncementFindUniqueArgs>(args: SelectSubset<T, AnnouncementFindUniqueArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Announcement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnnouncementFindUniqueOrThrowArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnnouncementFindUniqueOrThrowArgs>(args: SelectSubset<T, AnnouncementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Announcement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindFirstArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnnouncementFindFirstArgs>(args?: SelectSubset<T, AnnouncementFindFirstArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Announcement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindFirstOrThrowArgs} args - Arguments to find a Announcement
     * @example
     * // Get one Announcement
     * const announcement = await prisma.announcement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnnouncementFindFirstOrThrowArgs>(args?: SelectSubset<T, AnnouncementFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Announcements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Announcements
     * const announcements = await prisma.announcement.findMany()
     * 
     * // Get first 10 Announcements
     * const announcements = await prisma.announcement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const announcementWithIdOnly = await prisma.announcement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnnouncementFindManyArgs>(args?: SelectSubset<T, AnnouncementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Announcement.
     * @param {AnnouncementCreateArgs} args - Arguments to create a Announcement.
     * @example
     * // Create one Announcement
     * const Announcement = await prisma.announcement.create({
     *   data: {
     *     // ... data to create a Announcement
     *   }
     * })
     * 
     */
    create<T extends AnnouncementCreateArgs>(args: SelectSubset<T, AnnouncementCreateArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Announcements.
     * @param {AnnouncementCreateManyArgs} args - Arguments to create many Announcements.
     * @example
     * // Create many Announcements
     * const announcement = await prisma.announcement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnnouncementCreateManyArgs>(args?: SelectSubset<T, AnnouncementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Announcement.
     * @param {AnnouncementDeleteArgs} args - Arguments to delete one Announcement.
     * @example
     * // Delete one Announcement
     * const Announcement = await prisma.announcement.delete({
     *   where: {
     *     // ... filter to delete one Announcement
     *   }
     * })
     * 
     */
    delete<T extends AnnouncementDeleteArgs>(args: SelectSubset<T, AnnouncementDeleteArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Announcement.
     * @param {AnnouncementUpdateArgs} args - Arguments to update one Announcement.
     * @example
     * // Update one Announcement
     * const announcement = await prisma.announcement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnnouncementUpdateArgs>(args: SelectSubset<T, AnnouncementUpdateArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Announcements.
     * @param {AnnouncementDeleteManyArgs} args - Arguments to filter Announcements to delete.
     * @example
     * // Delete a few Announcements
     * const { count } = await prisma.announcement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnnouncementDeleteManyArgs>(args?: SelectSubset<T, AnnouncementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Announcements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Announcements
     * const announcement = await prisma.announcement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnnouncementUpdateManyArgs>(args: SelectSubset<T, AnnouncementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Announcement.
     * @param {AnnouncementUpsertArgs} args - Arguments to update or create a Announcement.
     * @example
     * // Update or create a Announcement
     * const announcement = await prisma.announcement.upsert({
     *   create: {
     *     // ... data to create a Announcement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Announcement we want to update
     *   }
     * })
     */
    upsert<T extends AnnouncementUpsertArgs>(args: SelectSubset<T, AnnouncementUpsertArgs<ExtArgs>>): Prisma__AnnouncementClient<$Result.GetResult<Prisma.$AnnouncementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Announcements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementCountArgs} args - Arguments to filter Announcements to count.
     * @example
     * // Count the number of Announcements
     * const count = await prisma.announcement.count({
     *   where: {
     *     // ... the filter for the Announcements we want to count
     *   }
     * })
    **/
    count<T extends AnnouncementCountArgs>(
      args?: Subset<T, AnnouncementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnnouncementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Announcement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AnnouncementAggregateArgs>(args: Subset<T, AnnouncementAggregateArgs>): Prisma.PrismaPromise<GetAnnouncementAggregateType<T>>

    /**
     * Group by Announcement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnnouncementGroupByArgs} args - Group by arguments.
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
      T extends AnnouncementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnnouncementGroupByArgs['orderBy'] }
        : { orderBy?: AnnouncementGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AnnouncementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnnouncementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Announcement model
   */
  readonly fields: AnnouncementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Announcement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnnouncementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Announcement model
   */
  interface AnnouncementFieldRefs {
    readonly id: FieldRef<"Announcement", 'String'>
    readonly title: FieldRef<"Announcement", 'String'>
    readonly content: FieldRef<"Announcement", 'String'>
    readonly createdBy: FieldRef<"Announcement", 'String'>
    readonly createdAt: FieldRef<"Announcement", 'DateTime'>
    readonly updatedAt: FieldRef<"Announcement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Announcement findUnique
   */
  export type AnnouncementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement findUniqueOrThrow
   */
  export type AnnouncementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement findFirst
   */
  export type AnnouncementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Announcements.
     */
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement findFirstOrThrow
   */
  export type AnnouncementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Filter, which Announcement to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Announcements.
     */
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement findMany
   */
  export type AnnouncementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Filter, which Announcements to fetch.
     */
    where?: AnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Announcements to fetch.
     */
    orderBy?: AnnouncementOrderByWithRelationInput | AnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Announcements.
     */
    cursor?: AnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Announcements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Announcements.
     */
    skip?: number
    distinct?: AnnouncementScalarFieldEnum | AnnouncementScalarFieldEnum[]
  }

  /**
   * Announcement create
   */
  export type AnnouncementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * The data needed to create a Announcement.
     */
    data: XOR<AnnouncementCreateInput, AnnouncementUncheckedCreateInput>
  }

  /**
   * Announcement createMany
   */
  export type AnnouncementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Announcements.
     */
    data: AnnouncementCreateManyInput | AnnouncementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Announcement update
   */
  export type AnnouncementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * The data needed to update a Announcement.
     */
    data: XOR<AnnouncementUpdateInput, AnnouncementUncheckedUpdateInput>
    /**
     * Choose, which Announcement to update.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement updateMany
   */
  export type AnnouncementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Announcements.
     */
    data: XOR<AnnouncementUpdateManyMutationInput, AnnouncementUncheckedUpdateManyInput>
    /**
     * Filter which Announcements to update
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to update.
     */
    limit?: number
  }

  /**
   * Announcement upsert
   */
  export type AnnouncementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * The filter to search for the Announcement to update in case it exists.
     */
    where: AnnouncementWhereUniqueInput
    /**
     * In case the Announcement found by the `where` argument doesn't exist, create a new Announcement with this data.
     */
    create: XOR<AnnouncementCreateInput, AnnouncementUncheckedCreateInput>
    /**
     * In case the Announcement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnnouncementUpdateInput, AnnouncementUncheckedUpdateInput>
  }

  /**
   * Announcement delete
   */
  export type AnnouncementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
    /**
     * Filter which Announcement to delete.
     */
    where: AnnouncementWhereUniqueInput
  }

  /**
   * Announcement deleteMany
   */
  export type AnnouncementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Announcements to delete
     */
    where?: AnnouncementWhereInput
    /**
     * Limit how many Announcements to delete.
     */
    limit?: number
  }

  /**
   * Announcement without action
   */
  export type AnnouncementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Announcement
     */
    select?: AnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Announcement
     */
    omit?: AnnouncementOmit<ExtArgs> | null
  }


  /**
   * Model PopupAnnouncement
   */

  export type AggregatePopupAnnouncement = {
    _count: PopupAnnouncementCountAggregateOutputType | null
    _min: PopupAnnouncementMinAggregateOutputType | null
    _max: PopupAnnouncementMaxAggregateOutputType | null
  }

  export type PopupAnnouncementMinAggregateOutputType = {
    id: string | null
    isActive: boolean | null
    title: string | null
    message: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PopupAnnouncementMaxAggregateOutputType = {
    id: string | null
    isActive: boolean | null
    title: string | null
    message: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PopupAnnouncementCountAggregateOutputType = {
    id: number
    isActive: number
    title: number
    message: number
    startDate: number
    endDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PopupAnnouncementMinAggregateInputType = {
    id?: true
    isActive?: true
    title?: true
    message?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PopupAnnouncementMaxAggregateInputType = {
    id?: true
    isActive?: true
    title?: true
    message?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PopupAnnouncementCountAggregateInputType = {
    id?: true
    isActive?: true
    title?: true
    message?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PopupAnnouncementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PopupAnnouncement to aggregate.
     */
    where?: PopupAnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PopupAnnouncements to fetch.
     */
    orderBy?: PopupAnnouncementOrderByWithRelationInput | PopupAnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PopupAnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PopupAnnouncements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PopupAnnouncements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PopupAnnouncements
    **/
    _count?: true | PopupAnnouncementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PopupAnnouncementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PopupAnnouncementMaxAggregateInputType
  }

  export type GetPopupAnnouncementAggregateType<T extends PopupAnnouncementAggregateArgs> = {
        [P in keyof T & keyof AggregatePopupAnnouncement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePopupAnnouncement[P]>
      : GetScalarType<T[P], AggregatePopupAnnouncement[P]>
  }




  export type PopupAnnouncementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PopupAnnouncementWhereInput
    orderBy?: PopupAnnouncementOrderByWithAggregationInput | PopupAnnouncementOrderByWithAggregationInput[]
    by: PopupAnnouncementScalarFieldEnum[] | PopupAnnouncementScalarFieldEnum
    having?: PopupAnnouncementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PopupAnnouncementCountAggregateInputType | true
    _min?: PopupAnnouncementMinAggregateInputType
    _max?: PopupAnnouncementMaxAggregateInputType
  }

  export type PopupAnnouncementGroupByOutputType = {
    id: string
    isActive: boolean
    title: string
    message: string
    startDate: Date
    endDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PopupAnnouncementCountAggregateOutputType | null
    _min: PopupAnnouncementMinAggregateOutputType | null
    _max: PopupAnnouncementMaxAggregateOutputType | null
  }

  type GetPopupAnnouncementGroupByPayload<T extends PopupAnnouncementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PopupAnnouncementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PopupAnnouncementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PopupAnnouncementGroupByOutputType[P]>
            : GetScalarType<T[P], PopupAnnouncementGroupByOutputType[P]>
        }
      >
    >


  export type PopupAnnouncementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    isActive?: boolean
    title?: boolean
    message?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["popupAnnouncement"]>



  export type PopupAnnouncementSelectScalar = {
    id?: boolean
    isActive?: boolean
    title?: boolean
    message?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PopupAnnouncementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "isActive" | "title" | "message" | "startDate" | "endDate" | "createdAt" | "updatedAt", ExtArgs["result"]["popupAnnouncement"]>

  export type $PopupAnnouncementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PopupAnnouncement"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      isActive: boolean
      title: string
      message: string
      startDate: Date
      endDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["popupAnnouncement"]>
    composites: {}
  }

  type PopupAnnouncementGetPayload<S extends boolean | null | undefined | PopupAnnouncementDefaultArgs> = $Result.GetResult<Prisma.$PopupAnnouncementPayload, S>

  type PopupAnnouncementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PopupAnnouncementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PopupAnnouncementCountAggregateInputType | true
    }

  export interface PopupAnnouncementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PopupAnnouncement'], meta: { name: 'PopupAnnouncement' } }
    /**
     * Find zero or one PopupAnnouncement that matches the filter.
     * @param {PopupAnnouncementFindUniqueArgs} args - Arguments to find a PopupAnnouncement
     * @example
     * // Get one PopupAnnouncement
     * const popupAnnouncement = await prisma.popupAnnouncement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PopupAnnouncementFindUniqueArgs>(args: SelectSubset<T, PopupAnnouncementFindUniqueArgs<ExtArgs>>): Prisma__PopupAnnouncementClient<$Result.GetResult<Prisma.$PopupAnnouncementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PopupAnnouncement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PopupAnnouncementFindUniqueOrThrowArgs} args - Arguments to find a PopupAnnouncement
     * @example
     * // Get one PopupAnnouncement
     * const popupAnnouncement = await prisma.popupAnnouncement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PopupAnnouncementFindUniqueOrThrowArgs>(args: SelectSubset<T, PopupAnnouncementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PopupAnnouncementClient<$Result.GetResult<Prisma.$PopupAnnouncementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PopupAnnouncement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PopupAnnouncementFindFirstArgs} args - Arguments to find a PopupAnnouncement
     * @example
     * // Get one PopupAnnouncement
     * const popupAnnouncement = await prisma.popupAnnouncement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PopupAnnouncementFindFirstArgs>(args?: SelectSubset<T, PopupAnnouncementFindFirstArgs<ExtArgs>>): Prisma__PopupAnnouncementClient<$Result.GetResult<Prisma.$PopupAnnouncementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PopupAnnouncement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PopupAnnouncementFindFirstOrThrowArgs} args - Arguments to find a PopupAnnouncement
     * @example
     * // Get one PopupAnnouncement
     * const popupAnnouncement = await prisma.popupAnnouncement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PopupAnnouncementFindFirstOrThrowArgs>(args?: SelectSubset<T, PopupAnnouncementFindFirstOrThrowArgs<ExtArgs>>): Prisma__PopupAnnouncementClient<$Result.GetResult<Prisma.$PopupAnnouncementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PopupAnnouncements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PopupAnnouncementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PopupAnnouncements
     * const popupAnnouncements = await prisma.popupAnnouncement.findMany()
     * 
     * // Get first 10 PopupAnnouncements
     * const popupAnnouncements = await prisma.popupAnnouncement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const popupAnnouncementWithIdOnly = await prisma.popupAnnouncement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PopupAnnouncementFindManyArgs>(args?: SelectSubset<T, PopupAnnouncementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PopupAnnouncementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PopupAnnouncement.
     * @param {PopupAnnouncementCreateArgs} args - Arguments to create a PopupAnnouncement.
     * @example
     * // Create one PopupAnnouncement
     * const PopupAnnouncement = await prisma.popupAnnouncement.create({
     *   data: {
     *     // ... data to create a PopupAnnouncement
     *   }
     * })
     * 
     */
    create<T extends PopupAnnouncementCreateArgs>(args: SelectSubset<T, PopupAnnouncementCreateArgs<ExtArgs>>): Prisma__PopupAnnouncementClient<$Result.GetResult<Prisma.$PopupAnnouncementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PopupAnnouncements.
     * @param {PopupAnnouncementCreateManyArgs} args - Arguments to create many PopupAnnouncements.
     * @example
     * // Create many PopupAnnouncements
     * const popupAnnouncement = await prisma.popupAnnouncement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PopupAnnouncementCreateManyArgs>(args?: SelectSubset<T, PopupAnnouncementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PopupAnnouncement.
     * @param {PopupAnnouncementDeleteArgs} args - Arguments to delete one PopupAnnouncement.
     * @example
     * // Delete one PopupAnnouncement
     * const PopupAnnouncement = await prisma.popupAnnouncement.delete({
     *   where: {
     *     // ... filter to delete one PopupAnnouncement
     *   }
     * })
     * 
     */
    delete<T extends PopupAnnouncementDeleteArgs>(args: SelectSubset<T, PopupAnnouncementDeleteArgs<ExtArgs>>): Prisma__PopupAnnouncementClient<$Result.GetResult<Prisma.$PopupAnnouncementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PopupAnnouncement.
     * @param {PopupAnnouncementUpdateArgs} args - Arguments to update one PopupAnnouncement.
     * @example
     * // Update one PopupAnnouncement
     * const popupAnnouncement = await prisma.popupAnnouncement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PopupAnnouncementUpdateArgs>(args: SelectSubset<T, PopupAnnouncementUpdateArgs<ExtArgs>>): Prisma__PopupAnnouncementClient<$Result.GetResult<Prisma.$PopupAnnouncementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PopupAnnouncements.
     * @param {PopupAnnouncementDeleteManyArgs} args - Arguments to filter PopupAnnouncements to delete.
     * @example
     * // Delete a few PopupAnnouncements
     * const { count } = await prisma.popupAnnouncement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PopupAnnouncementDeleteManyArgs>(args?: SelectSubset<T, PopupAnnouncementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PopupAnnouncements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PopupAnnouncementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PopupAnnouncements
     * const popupAnnouncement = await prisma.popupAnnouncement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PopupAnnouncementUpdateManyArgs>(args: SelectSubset<T, PopupAnnouncementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PopupAnnouncement.
     * @param {PopupAnnouncementUpsertArgs} args - Arguments to update or create a PopupAnnouncement.
     * @example
     * // Update or create a PopupAnnouncement
     * const popupAnnouncement = await prisma.popupAnnouncement.upsert({
     *   create: {
     *     // ... data to create a PopupAnnouncement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PopupAnnouncement we want to update
     *   }
     * })
     */
    upsert<T extends PopupAnnouncementUpsertArgs>(args: SelectSubset<T, PopupAnnouncementUpsertArgs<ExtArgs>>): Prisma__PopupAnnouncementClient<$Result.GetResult<Prisma.$PopupAnnouncementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PopupAnnouncements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PopupAnnouncementCountArgs} args - Arguments to filter PopupAnnouncements to count.
     * @example
     * // Count the number of PopupAnnouncements
     * const count = await prisma.popupAnnouncement.count({
     *   where: {
     *     // ... the filter for the PopupAnnouncements we want to count
     *   }
     * })
    **/
    count<T extends PopupAnnouncementCountArgs>(
      args?: Subset<T, PopupAnnouncementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PopupAnnouncementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PopupAnnouncement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PopupAnnouncementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PopupAnnouncementAggregateArgs>(args: Subset<T, PopupAnnouncementAggregateArgs>): Prisma.PrismaPromise<GetPopupAnnouncementAggregateType<T>>

    /**
     * Group by PopupAnnouncement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PopupAnnouncementGroupByArgs} args - Group by arguments.
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
      T extends PopupAnnouncementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PopupAnnouncementGroupByArgs['orderBy'] }
        : { orderBy?: PopupAnnouncementGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PopupAnnouncementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPopupAnnouncementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PopupAnnouncement model
   */
  readonly fields: PopupAnnouncementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PopupAnnouncement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PopupAnnouncementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the PopupAnnouncement model
   */
  interface PopupAnnouncementFieldRefs {
    readonly id: FieldRef<"PopupAnnouncement", 'String'>
    readonly isActive: FieldRef<"PopupAnnouncement", 'Boolean'>
    readonly title: FieldRef<"PopupAnnouncement", 'String'>
    readonly message: FieldRef<"PopupAnnouncement", 'String'>
    readonly startDate: FieldRef<"PopupAnnouncement", 'DateTime'>
    readonly endDate: FieldRef<"PopupAnnouncement", 'DateTime'>
    readonly createdAt: FieldRef<"PopupAnnouncement", 'DateTime'>
    readonly updatedAt: FieldRef<"PopupAnnouncement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PopupAnnouncement findUnique
   */
  export type PopupAnnouncementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopupAnnouncement
     */
    select?: PopupAnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopupAnnouncement
     */
    omit?: PopupAnnouncementOmit<ExtArgs> | null
    /**
     * Filter, which PopupAnnouncement to fetch.
     */
    where: PopupAnnouncementWhereUniqueInput
  }

  /**
   * PopupAnnouncement findUniqueOrThrow
   */
  export type PopupAnnouncementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopupAnnouncement
     */
    select?: PopupAnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopupAnnouncement
     */
    omit?: PopupAnnouncementOmit<ExtArgs> | null
    /**
     * Filter, which PopupAnnouncement to fetch.
     */
    where: PopupAnnouncementWhereUniqueInput
  }

  /**
   * PopupAnnouncement findFirst
   */
  export type PopupAnnouncementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopupAnnouncement
     */
    select?: PopupAnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopupAnnouncement
     */
    omit?: PopupAnnouncementOmit<ExtArgs> | null
    /**
     * Filter, which PopupAnnouncement to fetch.
     */
    where?: PopupAnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PopupAnnouncements to fetch.
     */
    orderBy?: PopupAnnouncementOrderByWithRelationInput | PopupAnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PopupAnnouncements.
     */
    cursor?: PopupAnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PopupAnnouncements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PopupAnnouncements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PopupAnnouncements.
     */
    distinct?: PopupAnnouncementScalarFieldEnum | PopupAnnouncementScalarFieldEnum[]
  }

  /**
   * PopupAnnouncement findFirstOrThrow
   */
  export type PopupAnnouncementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopupAnnouncement
     */
    select?: PopupAnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopupAnnouncement
     */
    omit?: PopupAnnouncementOmit<ExtArgs> | null
    /**
     * Filter, which PopupAnnouncement to fetch.
     */
    where?: PopupAnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PopupAnnouncements to fetch.
     */
    orderBy?: PopupAnnouncementOrderByWithRelationInput | PopupAnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PopupAnnouncements.
     */
    cursor?: PopupAnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PopupAnnouncements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PopupAnnouncements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PopupAnnouncements.
     */
    distinct?: PopupAnnouncementScalarFieldEnum | PopupAnnouncementScalarFieldEnum[]
  }

  /**
   * PopupAnnouncement findMany
   */
  export type PopupAnnouncementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopupAnnouncement
     */
    select?: PopupAnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopupAnnouncement
     */
    omit?: PopupAnnouncementOmit<ExtArgs> | null
    /**
     * Filter, which PopupAnnouncements to fetch.
     */
    where?: PopupAnnouncementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PopupAnnouncements to fetch.
     */
    orderBy?: PopupAnnouncementOrderByWithRelationInput | PopupAnnouncementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PopupAnnouncements.
     */
    cursor?: PopupAnnouncementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PopupAnnouncements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PopupAnnouncements.
     */
    skip?: number
    distinct?: PopupAnnouncementScalarFieldEnum | PopupAnnouncementScalarFieldEnum[]
  }

  /**
   * PopupAnnouncement create
   */
  export type PopupAnnouncementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopupAnnouncement
     */
    select?: PopupAnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopupAnnouncement
     */
    omit?: PopupAnnouncementOmit<ExtArgs> | null
    /**
     * The data needed to create a PopupAnnouncement.
     */
    data: XOR<PopupAnnouncementCreateInput, PopupAnnouncementUncheckedCreateInput>
  }

  /**
   * PopupAnnouncement createMany
   */
  export type PopupAnnouncementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PopupAnnouncements.
     */
    data: PopupAnnouncementCreateManyInput | PopupAnnouncementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PopupAnnouncement update
   */
  export type PopupAnnouncementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopupAnnouncement
     */
    select?: PopupAnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopupAnnouncement
     */
    omit?: PopupAnnouncementOmit<ExtArgs> | null
    /**
     * The data needed to update a PopupAnnouncement.
     */
    data: XOR<PopupAnnouncementUpdateInput, PopupAnnouncementUncheckedUpdateInput>
    /**
     * Choose, which PopupAnnouncement to update.
     */
    where: PopupAnnouncementWhereUniqueInput
  }

  /**
   * PopupAnnouncement updateMany
   */
  export type PopupAnnouncementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PopupAnnouncements.
     */
    data: XOR<PopupAnnouncementUpdateManyMutationInput, PopupAnnouncementUncheckedUpdateManyInput>
    /**
     * Filter which PopupAnnouncements to update
     */
    where?: PopupAnnouncementWhereInput
    /**
     * Limit how many PopupAnnouncements to update.
     */
    limit?: number
  }

  /**
   * PopupAnnouncement upsert
   */
  export type PopupAnnouncementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopupAnnouncement
     */
    select?: PopupAnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopupAnnouncement
     */
    omit?: PopupAnnouncementOmit<ExtArgs> | null
    /**
     * The filter to search for the PopupAnnouncement to update in case it exists.
     */
    where: PopupAnnouncementWhereUniqueInput
    /**
     * In case the PopupAnnouncement found by the `where` argument doesn't exist, create a new PopupAnnouncement with this data.
     */
    create: XOR<PopupAnnouncementCreateInput, PopupAnnouncementUncheckedCreateInput>
    /**
     * In case the PopupAnnouncement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PopupAnnouncementUpdateInput, PopupAnnouncementUncheckedUpdateInput>
  }

  /**
   * PopupAnnouncement delete
   */
  export type PopupAnnouncementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopupAnnouncement
     */
    select?: PopupAnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopupAnnouncement
     */
    omit?: PopupAnnouncementOmit<ExtArgs> | null
    /**
     * Filter which PopupAnnouncement to delete.
     */
    where: PopupAnnouncementWhereUniqueInput
  }

  /**
   * PopupAnnouncement deleteMany
   */
  export type PopupAnnouncementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PopupAnnouncements to delete
     */
    where?: PopupAnnouncementWhereInput
    /**
     * Limit how many PopupAnnouncements to delete.
     */
    limit?: number
  }

  /**
   * PopupAnnouncement without action
   */
  export type PopupAnnouncementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PopupAnnouncement
     */
    select?: PopupAnnouncementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PopupAnnouncement
     */
    omit?: PopupAnnouncementOmit<ExtArgs> | null
  }


  /**
   * Model SuspensionReason
   */

  export type AggregateSuspensionReason = {
    _count: SuspensionReasonCountAggregateOutputType | null
    _min: SuspensionReasonMinAggregateOutputType | null
    _max: SuspensionReasonMaxAggregateOutputType | null
  }

  export type SuspensionReasonMinAggregateOutputType = {
    id: string | null
    userId: string | null
    reason: string | null
    suspendedAt: Date | null
  }

  export type SuspensionReasonMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    reason: string | null
    suspendedAt: Date | null
  }

  export type SuspensionReasonCountAggregateOutputType = {
    id: number
    userId: number
    reason: number
    suspendedAt: number
    _all: number
  }


  export type SuspensionReasonMinAggregateInputType = {
    id?: true
    userId?: true
    reason?: true
    suspendedAt?: true
  }

  export type SuspensionReasonMaxAggregateInputType = {
    id?: true
    userId?: true
    reason?: true
    suspendedAt?: true
  }

  export type SuspensionReasonCountAggregateInputType = {
    id?: true
    userId?: true
    reason?: true
    suspendedAt?: true
    _all?: true
  }

  export type SuspensionReasonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SuspensionReason to aggregate.
     */
    where?: SuspensionReasonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuspensionReasons to fetch.
     */
    orderBy?: SuspensionReasonOrderByWithRelationInput | SuspensionReasonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SuspensionReasonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuspensionReasons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuspensionReasons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SuspensionReasons
    **/
    _count?: true | SuspensionReasonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SuspensionReasonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SuspensionReasonMaxAggregateInputType
  }

  export type GetSuspensionReasonAggregateType<T extends SuspensionReasonAggregateArgs> = {
        [P in keyof T & keyof AggregateSuspensionReason]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSuspensionReason[P]>
      : GetScalarType<T[P], AggregateSuspensionReason[P]>
  }




  export type SuspensionReasonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SuspensionReasonWhereInput
    orderBy?: SuspensionReasonOrderByWithAggregationInput | SuspensionReasonOrderByWithAggregationInput[]
    by: SuspensionReasonScalarFieldEnum[] | SuspensionReasonScalarFieldEnum
    having?: SuspensionReasonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SuspensionReasonCountAggregateInputType | true
    _min?: SuspensionReasonMinAggregateInputType
    _max?: SuspensionReasonMaxAggregateInputType
  }

  export type SuspensionReasonGroupByOutputType = {
    id: string
    userId: string
    reason: string
    suspendedAt: Date
    _count: SuspensionReasonCountAggregateOutputType | null
    _min: SuspensionReasonMinAggregateOutputType | null
    _max: SuspensionReasonMaxAggregateOutputType | null
  }

  type GetSuspensionReasonGroupByPayload<T extends SuspensionReasonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SuspensionReasonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SuspensionReasonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SuspensionReasonGroupByOutputType[P]>
            : GetScalarType<T[P], SuspensionReasonGroupByOutputType[P]>
        }
      >
    >


  export type SuspensionReasonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    reason?: boolean
    suspendedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["suspensionReason"]>



  export type SuspensionReasonSelectScalar = {
    id?: boolean
    userId?: boolean
    reason?: boolean
    suspendedAt?: boolean
  }

  export type SuspensionReasonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "reason" | "suspendedAt", ExtArgs["result"]["suspensionReason"]>
  export type SuspensionReasonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SuspensionReasonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SuspensionReason"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      reason: string
      suspendedAt: Date
    }, ExtArgs["result"]["suspensionReason"]>
    composites: {}
  }

  type SuspensionReasonGetPayload<S extends boolean | null | undefined | SuspensionReasonDefaultArgs> = $Result.GetResult<Prisma.$SuspensionReasonPayload, S>

  type SuspensionReasonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SuspensionReasonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SuspensionReasonCountAggregateInputType | true
    }

  export interface SuspensionReasonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SuspensionReason'], meta: { name: 'SuspensionReason' } }
    /**
     * Find zero or one SuspensionReason that matches the filter.
     * @param {SuspensionReasonFindUniqueArgs} args - Arguments to find a SuspensionReason
     * @example
     * // Get one SuspensionReason
     * const suspensionReason = await prisma.suspensionReason.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SuspensionReasonFindUniqueArgs>(args: SelectSubset<T, SuspensionReasonFindUniqueArgs<ExtArgs>>): Prisma__SuspensionReasonClient<$Result.GetResult<Prisma.$SuspensionReasonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SuspensionReason that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SuspensionReasonFindUniqueOrThrowArgs} args - Arguments to find a SuspensionReason
     * @example
     * // Get one SuspensionReason
     * const suspensionReason = await prisma.suspensionReason.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SuspensionReasonFindUniqueOrThrowArgs>(args: SelectSubset<T, SuspensionReasonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SuspensionReasonClient<$Result.GetResult<Prisma.$SuspensionReasonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SuspensionReason that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuspensionReasonFindFirstArgs} args - Arguments to find a SuspensionReason
     * @example
     * // Get one SuspensionReason
     * const suspensionReason = await prisma.suspensionReason.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SuspensionReasonFindFirstArgs>(args?: SelectSubset<T, SuspensionReasonFindFirstArgs<ExtArgs>>): Prisma__SuspensionReasonClient<$Result.GetResult<Prisma.$SuspensionReasonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SuspensionReason that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuspensionReasonFindFirstOrThrowArgs} args - Arguments to find a SuspensionReason
     * @example
     * // Get one SuspensionReason
     * const suspensionReason = await prisma.suspensionReason.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SuspensionReasonFindFirstOrThrowArgs>(args?: SelectSubset<T, SuspensionReasonFindFirstOrThrowArgs<ExtArgs>>): Prisma__SuspensionReasonClient<$Result.GetResult<Prisma.$SuspensionReasonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SuspensionReasons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuspensionReasonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SuspensionReasons
     * const suspensionReasons = await prisma.suspensionReason.findMany()
     * 
     * // Get first 10 SuspensionReasons
     * const suspensionReasons = await prisma.suspensionReason.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const suspensionReasonWithIdOnly = await prisma.suspensionReason.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SuspensionReasonFindManyArgs>(args?: SelectSubset<T, SuspensionReasonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuspensionReasonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SuspensionReason.
     * @param {SuspensionReasonCreateArgs} args - Arguments to create a SuspensionReason.
     * @example
     * // Create one SuspensionReason
     * const SuspensionReason = await prisma.suspensionReason.create({
     *   data: {
     *     // ... data to create a SuspensionReason
     *   }
     * })
     * 
     */
    create<T extends SuspensionReasonCreateArgs>(args: SelectSubset<T, SuspensionReasonCreateArgs<ExtArgs>>): Prisma__SuspensionReasonClient<$Result.GetResult<Prisma.$SuspensionReasonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SuspensionReasons.
     * @param {SuspensionReasonCreateManyArgs} args - Arguments to create many SuspensionReasons.
     * @example
     * // Create many SuspensionReasons
     * const suspensionReason = await prisma.suspensionReason.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SuspensionReasonCreateManyArgs>(args?: SelectSubset<T, SuspensionReasonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SuspensionReason.
     * @param {SuspensionReasonDeleteArgs} args - Arguments to delete one SuspensionReason.
     * @example
     * // Delete one SuspensionReason
     * const SuspensionReason = await prisma.suspensionReason.delete({
     *   where: {
     *     // ... filter to delete one SuspensionReason
     *   }
     * })
     * 
     */
    delete<T extends SuspensionReasonDeleteArgs>(args: SelectSubset<T, SuspensionReasonDeleteArgs<ExtArgs>>): Prisma__SuspensionReasonClient<$Result.GetResult<Prisma.$SuspensionReasonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SuspensionReason.
     * @param {SuspensionReasonUpdateArgs} args - Arguments to update one SuspensionReason.
     * @example
     * // Update one SuspensionReason
     * const suspensionReason = await prisma.suspensionReason.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SuspensionReasonUpdateArgs>(args: SelectSubset<T, SuspensionReasonUpdateArgs<ExtArgs>>): Prisma__SuspensionReasonClient<$Result.GetResult<Prisma.$SuspensionReasonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SuspensionReasons.
     * @param {SuspensionReasonDeleteManyArgs} args - Arguments to filter SuspensionReasons to delete.
     * @example
     * // Delete a few SuspensionReasons
     * const { count } = await prisma.suspensionReason.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SuspensionReasonDeleteManyArgs>(args?: SelectSubset<T, SuspensionReasonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SuspensionReasons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuspensionReasonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SuspensionReasons
     * const suspensionReason = await prisma.suspensionReason.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SuspensionReasonUpdateManyArgs>(args: SelectSubset<T, SuspensionReasonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SuspensionReason.
     * @param {SuspensionReasonUpsertArgs} args - Arguments to update or create a SuspensionReason.
     * @example
     * // Update or create a SuspensionReason
     * const suspensionReason = await prisma.suspensionReason.upsert({
     *   create: {
     *     // ... data to create a SuspensionReason
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SuspensionReason we want to update
     *   }
     * })
     */
    upsert<T extends SuspensionReasonUpsertArgs>(args: SelectSubset<T, SuspensionReasonUpsertArgs<ExtArgs>>): Prisma__SuspensionReasonClient<$Result.GetResult<Prisma.$SuspensionReasonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SuspensionReasons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuspensionReasonCountArgs} args - Arguments to filter SuspensionReasons to count.
     * @example
     * // Count the number of SuspensionReasons
     * const count = await prisma.suspensionReason.count({
     *   where: {
     *     // ... the filter for the SuspensionReasons we want to count
     *   }
     * })
    **/
    count<T extends SuspensionReasonCountArgs>(
      args?: Subset<T, SuspensionReasonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SuspensionReasonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SuspensionReason.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuspensionReasonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SuspensionReasonAggregateArgs>(args: Subset<T, SuspensionReasonAggregateArgs>): Prisma.PrismaPromise<GetSuspensionReasonAggregateType<T>>

    /**
     * Group by SuspensionReason.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuspensionReasonGroupByArgs} args - Group by arguments.
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
      T extends SuspensionReasonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SuspensionReasonGroupByArgs['orderBy'] }
        : { orderBy?: SuspensionReasonGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SuspensionReasonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuspensionReasonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SuspensionReason model
   */
  readonly fields: SuspensionReasonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SuspensionReason.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SuspensionReasonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SuspensionReason model
   */
  interface SuspensionReasonFieldRefs {
    readonly id: FieldRef<"SuspensionReason", 'String'>
    readonly userId: FieldRef<"SuspensionReason", 'String'>
    readonly reason: FieldRef<"SuspensionReason", 'String'>
    readonly suspendedAt: FieldRef<"SuspensionReason", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SuspensionReason findUnique
   */
  export type SuspensionReasonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuspensionReason
     */
    select?: SuspensionReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuspensionReason
     */
    omit?: SuspensionReasonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuspensionReasonInclude<ExtArgs> | null
    /**
     * Filter, which SuspensionReason to fetch.
     */
    where: SuspensionReasonWhereUniqueInput
  }

  /**
   * SuspensionReason findUniqueOrThrow
   */
  export type SuspensionReasonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuspensionReason
     */
    select?: SuspensionReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuspensionReason
     */
    omit?: SuspensionReasonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuspensionReasonInclude<ExtArgs> | null
    /**
     * Filter, which SuspensionReason to fetch.
     */
    where: SuspensionReasonWhereUniqueInput
  }

  /**
   * SuspensionReason findFirst
   */
  export type SuspensionReasonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuspensionReason
     */
    select?: SuspensionReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuspensionReason
     */
    omit?: SuspensionReasonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuspensionReasonInclude<ExtArgs> | null
    /**
     * Filter, which SuspensionReason to fetch.
     */
    where?: SuspensionReasonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuspensionReasons to fetch.
     */
    orderBy?: SuspensionReasonOrderByWithRelationInput | SuspensionReasonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SuspensionReasons.
     */
    cursor?: SuspensionReasonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuspensionReasons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuspensionReasons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SuspensionReasons.
     */
    distinct?: SuspensionReasonScalarFieldEnum | SuspensionReasonScalarFieldEnum[]
  }

  /**
   * SuspensionReason findFirstOrThrow
   */
  export type SuspensionReasonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuspensionReason
     */
    select?: SuspensionReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuspensionReason
     */
    omit?: SuspensionReasonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuspensionReasonInclude<ExtArgs> | null
    /**
     * Filter, which SuspensionReason to fetch.
     */
    where?: SuspensionReasonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuspensionReasons to fetch.
     */
    orderBy?: SuspensionReasonOrderByWithRelationInput | SuspensionReasonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SuspensionReasons.
     */
    cursor?: SuspensionReasonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuspensionReasons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuspensionReasons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SuspensionReasons.
     */
    distinct?: SuspensionReasonScalarFieldEnum | SuspensionReasonScalarFieldEnum[]
  }

  /**
   * SuspensionReason findMany
   */
  export type SuspensionReasonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuspensionReason
     */
    select?: SuspensionReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuspensionReason
     */
    omit?: SuspensionReasonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuspensionReasonInclude<ExtArgs> | null
    /**
     * Filter, which SuspensionReasons to fetch.
     */
    where?: SuspensionReasonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuspensionReasons to fetch.
     */
    orderBy?: SuspensionReasonOrderByWithRelationInput | SuspensionReasonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SuspensionReasons.
     */
    cursor?: SuspensionReasonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuspensionReasons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuspensionReasons.
     */
    skip?: number
    distinct?: SuspensionReasonScalarFieldEnum | SuspensionReasonScalarFieldEnum[]
  }

  /**
   * SuspensionReason create
   */
  export type SuspensionReasonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuspensionReason
     */
    select?: SuspensionReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuspensionReason
     */
    omit?: SuspensionReasonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuspensionReasonInclude<ExtArgs> | null
    /**
     * The data needed to create a SuspensionReason.
     */
    data: XOR<SuspensionReasonCreateInput, SuspensionReasonUncheckedCreateInput>
  }

  /**
   * SuspensionReason createMany
   */
  export type SuspensionReasonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SuspensionReasons.
     */
    data: SuspensionReasonCreateManyInput | SuspensionReasonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SuspensionReason update
   */
  export type SuspensionReasonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuspensionReason
     */
    select?: SuspensionReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuspensionReason
     */
    omit?: SuspensionReasonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuspensionReasonInclude<ExtArgs> | null
    /**
     * The data needed to update a SuspensionReason.
     */
    data: XOR<SuspensionReasonUpdateInput, SuspensionReasonUncheckedUpdateInput>
    /**
     * Choose, which SuspensionReason to update.
     */
    where: SuspensionReasonWhereUniqueInput
  }

  /**
   * SuspensionReason updateMany
   */
  export type SuspensionReasonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SuspensionReasons.
     */
    data: XOR<SuspensionReasonUpdateManyMutationInput, SuspensionReasonUncheckedUpdateManyInput>
    /**
     * Filter which SuspensionReasons to update
     */
    where?: SuspensionReasonWhereInput
    /**
     * Limit how many SuspensionReasons to update.
     */
    limit?: number
  }

  /**
   * SuspensionReason upsert
   */
  export type SuspensionReasonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuspensionReason
     */
    select?: SuspensionReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuspensionReason
     */
    omit?: SuspensionReasonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuspensionReasonInclude<ExtArgs> | null
    /**
     * The filter to search for the SuspensionReason to update in case it exists.
     */
    where: SuspensionReasonWhereUniqueInput
    /**
     * In case the SuspensionReason found by the `where` argument doesn't exist, create a new SuspensionReason with this data.
     */
    create: XOR<SuspensionReasonCreateInput, SuspensionReasonUncheckedCreateInput>
    /**
     * In case the SuspensionReason was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SuspensionReasonUpdateInput, SuspensionReasonUncheckedUpdateInput>
  }

  /**
   * SuspensionReason delete
   */
  export type SuspensionReasonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuspensionReason
     */
    select?: SuspensionReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuspensionReason
     */
    omit?: SuspensionReasonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuspensionReasonInclude<ExtArgs> | null
    /**
     * Filter which SuspensionReason to delete.
     */
    where: SuspensionReasonWhereUniqueInput
  }

  /**
   * SuspensionReason deleteMany
   */
  export type SuspensionReasonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SuspensionReasons to delete
     */
    where?: SuspensionReasonWhereInput
    /**
     * Limit how many SuspensionReasons to delete.
     */
    limit?: number
  }

  /**
   * SuspensionReason without action
   */
  export type SuspensionReasonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuspensionReason
     */
    select?: SuspensionReasonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SuspensionReason
     */
    omit?: SuspensionReasonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuspensionReasonInclude<ExtArgs> | null
  }


  /**
   * Model BillingAddress
   */

  export type AggregateBillingAddress = {
    _count: BillingAddressCountAggregateOutputType | null
    _min: BillingAddressMinAggregateOutputType | null
    _max: BillingAddressMaxAggregateOutputType | null
  }

  export type BillingAddressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    houseNo: string | null
    line1: string | null
    line2: string | null
    city: string | null
    district: string | null
    state: string | null
    stateCode: string | null
    country: string | null
    pincode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BillingAddressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    houseNo: string | null
    line1: string | null
    line2: string | null
    city: string | null
    district: string | null
    state: string | null
    stateCode: string | null
    country: string | null
    pincode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BillingAddressCountAggregateOutputType = {
    id: number
    userId: number
    houseNo: number
    line1: number
    line2: number
    city: number
    district: number
    state: number
    stateCode: number
    country: number
    pincode: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BillingAddressMinAggregateInputType = {
    id?: true
    userId?: true
    houseNo?: true
    line1?: true
    line2?: true
    city?: true
    district?: true
    state?: true
    stateCode?: true
    country?: true
    pincode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BillingAddressMaxAggregateInputType = {
    id?: true
    userId?: true
    houseNo?: true
    line1?: true
    line2?: true
    city?: true
    district?: true
    state?: true
    stateCode?: true
    country?: true
    pincode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BillingAddressCountAggregateInputType = {
    id?: true
    userId?: true
    houseNo?: true
    line1?: true
    line2?: true
    city?: true
    district?: true
    state?: true
    stateCode?: true
    country?: true
    pincode?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BillingAddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BillingAddress to aggregate.
     */
    where?: BillingAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillingAddresses to fetch.
     */
    orderBy?: BillingAddressOrderByWithRelationInput | BillingAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BillingAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillingAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillingAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BillingAddresses
    **/
    _count?: true | BillingAddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BillingAddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BillingAddressMaxAggregateInputType
  }

  export type GetBillingAddressAggregateType<T extends BillingAddressAggregateArgs> = {
        [P in keyof T & keyof AggregateBillingAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBillingAddress[P]>
      : GetScalarType<T[P], AggregateBillingAddress[P]>
  }




  export type BillingAddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillingAddressWhereInput
    orderBy?: BillingAddressOrderByWithAggregationInput | BillingAddressOrderByWithAggregationInput[]
    by: BillingAddressScalarFieldEnum[] | BillingAddressScalarFieldEnum
    having?: BillingAddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BillingAddressCountAggregateInputType | true
    _min?: BillingAddressMinAggregateInputType
    _max?: BillingAddressMaxAggregateInputType
  }

  export type BillingAddressGroupByOutputType = {
    id: string
    userId: string
    houseNo: string
    line1: string
    line2: string | null
    city: string
    district: string
    state: string
    stateCode: string | null
    country: string
    pincode: string
    createdAt: Date
    updatedAt: Date
    _count: BillingAddressCountAggregateOutputType | null
    _min: BillingAddressMinAggregateOutputType | null
    _max: BillingAddressMaxAggregateOutputType | null
  }

  type GetBillingAddressGroupByPayload<T extends BillingAddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BillingAddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BillingAddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BillingAddressGroupByOutputType[P]>
            : GetScalarType<T[P], BillingAddressGroupByOutputType[P]>
        }
      >
    >


  export type BillingAddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    houseNo?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    district?: boolean
    state?: boolean
    stateCode?: boolean
    country?: boolean
    pincode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["billingAddress"]>



  export type BillingAddressSelectScalar = {
    id?: boolean
    userId?: boolean
    houseNo?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    district?: boolean
    state?: boolean
    stateCode?: boolean
    country?: boolean
    pincode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BillingAddressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "houseNo" | "line1" | "line2" | "city" | "district" | "state" | "stateCode" | "country" | "pincode" | "createdAt" | "updatedAt", ExtArgs["result"]["billingAddress"]>
  export type BillingAddressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BillingAddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BillingAddress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      houseNo: string
      line1: string
      line2: string | null
      city: string
      district: string
      state: string
      stateCode: string | null
      country: string
      pincode: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["billingAddress"]>
    composites: {}
  }

  type BillingAddressGetPayload<S extends boolean | null | undefined | BillingAddressDefaultArgs> = $Result.GetResult<Prisma.$BillingAddressPayload, S>

  type BillingAddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BillingAddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BillingAddressCountAggregateInputType | true
    }

  export interface BillingAddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BillingAddress'], meta: { name: 'BillingAddress' } }
    /**
     * Find zero or one BillingAddress that matches the filter.
     * @param {BillingAddressFindUniqueArgs} args - Arguments to find a BillingAddress
     * @example
     * // Get one BillingAddress
     * const billingAddress = await prisma.billingAddress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BillingAddressFindUniqueArgs>(args: SelectSubset<T, BillingAddressFindUniqueArgs<ExtArgs>>): Prisma__BillingAddressClient<$Result.GetResult<Prisma.$BillingAddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BillingAddress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BillingAddressFindUniqueOrThrowArgs} args - Arguments to find a BillingAddress
     * @example
     * // Get one BillingAddress
     * const billingAddress = await prisma.billingAddress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BillingAddressFindUniqueOrThrowArgs>(args: SelectSubset<T, BillingAddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BillingAddressClient<$Result.GetResult<Prisma.$BillingAddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BillingAddress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingAddressFindFirstArgs} args - Arguments to find a BillingAddress
     * @example
     * // Get one BillingAddress
     * const billingAddress = await prisma.billingAddress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BillingAddressFindFirstArgs>(args?: SelectSubset<T, BillingAddressFindFirstArgs<ExtArgs>>): Prisma__BillingAddressClient<$Result.GetResult<Prisma.$BillingAddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BillingAddress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingAddressFindFirstOrThrowArgs} args - Arguments to find a BillingAddress
     * @example
     * // Get one BillingAddress
     * const billingAddress = await prisma.billingAddress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BillingAddressFindFirstOrThrowArgs>(args?: SelectSubset<T, BillingAddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__BillingAddressClient<$Result.GetResult<Prisma.$BillingAddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BillingAddresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingAddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BillingAddresses
     * const billingAddresses = await prisma.billingAddress.findMany()
     * 
     * // Get first 10 BillingAddresses
     * const billingAddresses = await prisma.billingAddress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const billingAddressWithIdOnly = await prisma.billingAddress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BillingAddressFindManyArgs>(args?: SelectSubset<T, BillingAddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillingAddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BillingAddress.
     * @param {BillingAddressCreateArgs} args - Arguments to create a BillingAddress.
     * @example
     * // Create one BillingAddress
     * const BillingAddress = await prisma.billingAddress.create({
     *   data: {
     *     // ... data to create a BillingAddress
     *   }
     * })
     * 
     */
    create<T extends BillingAddressCreateArgs>(args: SelectSubset<T, BillingAddressCreateArgs<ExtArgs>>): Prisma__BillingAddressClient<$Result.GetResult<Prisma.$BillingAddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BillingAddresses.
     * @param {BillingAddressCreateManyArgs} args - Arguments to create many BillingAddresses.
     * @example
     * // Create many BillingAddresses
     * const billingAddress = await prisma.billingAddress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BillingAddressCreateManyArgs>(args?: SelectSubset<T, BillingAddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BillingAddress.
     * @param {BillingAddressDeleteArgs} args - Arguments to delete one BillingAddress.
     * @example
     * // Delete one BillingAddress
     * const BillingAddress = await prisma.billingAddress.delete({
     *   where: {
     *     // ... filter to delete one BillingAddress
     *   }
     * })
     * 
     */
    delete<T extends BillingAddressDeleteArgs>(args: SelectSubset<T, BillingAddressDeleteArgs<ExtArgs>>): Prisma__BillingAddressClient<$Result.GetResult<Prisma.$BillingAddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BillingAddress.
     * @param {BillingAddressUpdateArgs} args - Arguments to update one BillingAddress.
     * @example
     * // Update one BillingAddress
     * const billingAddress = await prisma.billingAddress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BillingAddressUpdateArgs>(args: SelectSubset<T, BillingAddressUpdateArgs<ExtArgs>>): Prisma__BillingAddressClient<$Result.GetResult<Prisma.$BillingAddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BillingAddresses.
     * @param {BillingAddressDeleteManyArgs} args - Arguments to filter BillingAddresses to delete.
     * @example
     * // Delete a few BillingAddresses
     * const { count } = await prisma.billingAddress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BillingAddressDeleteManyArgs>(args?: SelectSubset<T, BillingAddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BillingAddresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingAddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BillingAddresses
     * const billingAddress = await prisma.billingAddress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BillingAddressUpdateManyArgs>(args: SelectSubset<T, BillingAddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BillingAddress.
     * @param {BillingAddressUpsertArgs} args - Arguments to update or create a BillingAddress.
     * @example
     * // Update or create a BillingAddress
     * const billingAddress = await prisma.billingAddress.upsert({
     *   create: {
     *     // ... data to create a BillingAddress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BillingAddress we want to update
     *   }
     * })
     */
    upsert<T extends BillingAddressUpsertArgs>(args: SelectSubset<T, BillingAddressUpsertArgs<ExtArgs>>): Prisma__BillingAddressClient<$Result.GetResult<Prisma.$BillingAddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BillingAddresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingAddressCountArgs} args - Arguments to filter BillingAddresses to count.
     * @example
     * // Count the number of BillingAddresses
     * const count = await prisma.billingAddress.count({
     *   where: {
     *     // ... the filter for the BillingAddresses we want to count
     *   }
     * })
    **/
    count<T extends BillingAddressCountArgs>(
      args?: Subset<T, BillingAddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BillingAddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BillingAddress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingAddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BillingAddressAggregateArgs>(args: Subset<T, BillingAddressAggregateArgs>): Prisma.PrismaPromise<GetBillingAddressAggregateType<T>>

    /**
     * Group by BillingAddress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingAddressGroupByArgs} args - Group by arguments.
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
      T extends BillingAddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BillingAddressGroupByArgs['orderBy'] }
        : { orderBy?: BillingAddressGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BillingAddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBillingAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BillingAddress model
   */
  readonly fields: BillingAddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BillingAddress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BillingAddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the BillingAddress model
   */
  interface BillingAddressFieldRefs {
    readonly id: FieldRef<"BillingAddress", 'String'>
    readonly userId: FieldRef<"BillingAddress", 'String'>
    readonly houseNo: FieldRef<"BillingAddress", 'String'>
    readonly line1: FieldRef<"BillingAddress", 'String'>
    readonly line2: FieldRef<"BillingAddress", 'String'>
    readonly city: FieldRef<"BillingAddress", 'String'>
    readonly district: FieldRef<"BillingAddress", 'String'>
    readonly state: FieldRef<"BillingAddress", 'String'>
    readonly stateCode: FieldRef<"BillingAddress", 'String'>
    readonly country: FieldRef<"BillingAddress", 'String'>
    readonly pincode: FieldRef<"BillingAddress", 'String'>
    readonly createdAt: FieldRef<"BillingAddress", 'DateTime'>
    readonly updatedAt: FieldRef<"BillingAddress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BillingAddress findUnique
   */
  export type BillingAddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingAddress
     */
    select?: BillingAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillingAddress
     */
    omit?: BillingAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingAddressInclude<ExtArgs> | null
    /**
     * Filter, which BillingAddress to fetch.
     */
    where: BillingAddressWhereUniqueInput
  }

  /**
   * BillingAddress findUniqueOrThrow
   */
  export type BillingAddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingAddress
     */
    select?: BillingAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillingAddress
     */
    omit?: BillingAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingAddressInclude<ExtArgs> | null
    /**
     * Filter, which BillingAddress to fetch.
     */
    where: BillingAddressWhereUniqueInput
  }

  /**
   * BillingAddress findFirst
   */
  export type BillingAddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingAddress
     */
    select?: BillingAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillingAddress
     */
    omit?: BillingAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingAddressInclude<ExtArgs> | null
    /**
     * Filter, which BillingAddress to fetch.
     */
    where?: BillingAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillingAddresses to fetch.
     */
    orderBy?: BillingAddressOrderByWithRelationInput | BillingAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BillingAddresses.
     */
    cursor?: BillingAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillingAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillingAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BillingAddresses.
     */
    distinct?: BillingAddressScalarFieldEnum | BillingAddressScalarFieldEnum[]
  }

  /**
   * BillingAddress findFirstOrThrow
   */
  export type BillingAddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingAddress
     */
    select?: BillingAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillingAddress
     */
    omit?: BillingAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingAddressInclude<ExtArgs> | null
    /**
     * Filter, which BillingAddress to fetch.
     */
    where?: BillingAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillingAddresses to fetch.
     */
    orderBy?: BillingAddressOrderByWithRelationInput | BillingAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BillingAddresses.
     */
    cursor?: BillingAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillingAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillingAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BillingAddresses.
     */
    distinct?: BillingAddressScalarFieldEnum | BillingAddressScalarFieldEnum[]
  }

  /**
   * BillingAddress findMany
   */
  export type BillingAddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingAddress
     */
    select?: BillingAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillingAddress
     */
    omit?: BillingAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingAddressInclude<ExtArgs> | null
    /**
     * Filter, which BillingAddresses to fetch.
     */
    where?: BillingAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillingAddresses to fetch.
     */
    orderBy?: BillingAddressOrderByWithRelationInput | BillingAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BillingAddresses.
     */
    cursor?: BillingAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillingAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillingAddresses.
     */
    skip?: number
    distinct?: BillingAddressScalarFieldEnum | BillingAddressScalarFieldEnum[]
  }

  /**
   * BillingAddress create
   */
  export type BillingAddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingAddress
     */
    select?: BillingAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillingAddress
     */
    omit?: BillingAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingAddressInclude<ExtArgs> | null
    /**
     * The data needed to create a BillingAddress.
     */
    data: XOR<BillingAddressCreateInput, BillingAddressUncheckedCreateInput>
  }

  /**
   * BillingAddress createMany
   */
  export type BillingAddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BillingAddresses.
     */
    data: BillingAddressCreateManyInput | BillingAddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BillingAddress update
   */
  export type BillingAddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingAddress
     */
    select?: BillingAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillingAddress
     */
    omit?: BillingAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingAddressInclude<ExtArgs> | null
    /**
     * The data needed to update a BillingAddress.
     */
    data: XOR<BillingAddressUpdateInput, BillingAddressUncheckedUpdateInput>
    /**
     * Choose, which BillingAddress to update.
     */
    where: BillingAddressWhereUniqueInput
  }

  /**
   * BillingAddress updateMany
   */
  export type BillingAddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BillingAddresses.
     */
    data: XOR<BillingAddressUpdateManyMutationInput, BillingAddressUncheckedUpdateManyInput>
    /**
     * Filter which BillingAddresses to update
     */
    where?: BillingAddressWhereInput
    /**
     * Limit how many BillingAddresses to update.
     */
    limit?: number
  }

  /**
   * BillingAddress upsert
   */
  export type BillingAddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingAddress
     */
    select?: BillingAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillingAddress
     */
    omit?: BillingAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingAddressInclude<ExtArgs> | null
    /**
     * The filter to search for the BillingAddress to update in case it exists.
     */
    where: BillingAddressWhereUniqueInput
    /**
     * In case the BillingAddress found by the `where` argument doesn't exist, create a new BillingAddress with this data.
     */
    create: XOR<BillingAddressCreateInput, BillingAddressUncheckedCreateInput>
    /**
     * In case the BillingAddress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BillingAddressUpdateInput, BillingAddressUncheckedUpdateInput>
  }

  /**
   * BillingAddress delete
   */
  export type BillingAddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingAddress
     */
    select?: BillingAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillingAddress
     */
    omit?: BillingAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingAddressInclude<ExtArgs> | null
    /**
     * Filter which BillingAddress to delete.
     */
    where: BillingAddressWhereUniqueInput
  }

  /**
   * BillingAddress deleteMany
   */
  export type BillingAddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BillingAddresses to delete
     */
    where?: BillingAddressWhereInput
    /**
     * Limit how many BillingAddresses to delete.
     */
    limit?: number
  }

  /**
   * BillingAddress without action
   */
  export type BillingAddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingAddress
     */
    select?: BillingAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BillingAddress
     */
    omit?: BillingAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingAddressInclude<ExtArgs> | null
  }


  /**
   * Model Supplier
   */

  export type AggregateSupplier = {
    _count: SupplierCountAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  export type SupplierMinAggregateOutputType = {
    id: string | null
    type: string | null
    name: string | null
    phone: string | null
    email: string | null
    gstNumber: string | null
    fssaiLicense: string | null
    houseNo: string | null
    line1: string | null
    line2: string | null
    city: string | null
    district: string | null
    state: string | null
    stateCode: string | null
    country: string | null
    pincode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplierMaxAggregateOutputType = {
    id: string | null
    type: string | null
    name: string | null
    phone: string | null
    email: string | null
    gstNumber: string | null
    fssaiLicense: string | null
    houseNo: string | null
    line1: string | null
    line2: string | null
    city: string | null
    district: string | null
    state: string | null
    stateCode: string | null
    country: string | null
    pincode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupplierCountAggregateOutputType = {
    id: number
    type: number
    name: number
    phone: number
    email: number
    gstNumber: number
    fssaiLicense: number
    houseNo: number
    line1: number
    line2: number
    city: number
    district: number
    state: number
    stateCode: number
    country: number
    pincode: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SupplierMinAggregateInputType = {
    id?: true
    type?: true
    name?: true
    phone?: true
    email?: true
    gstNumber?: true
    fssaiLicense?: true
    houseNo?: true
    line1?: true
    line2?: true
    city?: true
    district?: true
    state?: true
    stateCode?: true
    country?: true
    pincode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplierMaxAggregateInputType = {
    id?: true
    type?: true
    name?: true
    phone?: true
    email?: true
    gstNumber?: true
    fssaiLicense?: true
    houseNo?: true
    line1?: true
    line2?: true
    city?: true
    district?: true
    state?: true
    stateCode?: true
    country?: true
    pincode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupplierCountAggregateInputType = {
    id?: true
    type?: true
    name?: true
    phone?: true
    email?: true
    gstNumber?: true
    fssaiLicense?: true
    houseNo?: true
    line1?: true
    line2?: true
    city?: true
    district?: true
    state?: true
    stateCode?: true
    country?: true
    pincode?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SupplierAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Supplier to aggregate.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Suppliers
    **/
    _count?: true | SupplierCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupplierMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupplierMaxAggregateInputType
  }

  export type GetSupplierAggregateType<T extends SupplierAggregateArgs> = {
        [P in keyof T & keyof AggregateSupplier]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupplier[P]>
      : GetScalarType<T[P], AggregateSupplier[P]>
  }




  export type SupplierGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplierWhereInput
    orderBy?: SupplierOrderByWithAggregationInput | SupplierOrderByWithAggregationInput[]
    by: SupplierScalarFieldEnum[] | SupplierScalarFieldEnum
    having?: SupplierScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupplierCountAggregateInputType | true
    _min?: SupplierMinAggregateInputType
    _max?: SupplierMaxAggregateInputType
  }

  export type SupplierGroupByOutputType = {
    id: string
    type: string
    name: string
    phone: string
    email: string
    gstNumber: string | null
    fssaiLicense: string | null
    houseNo: string
    line1: string
    line2: string | null
    city: string
    district: string
    state: string
    stateCode: string | null
    country: string
    pincode: string
    createdAt: Date
    updatedAt: Date
    _count: SupplierCountAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  type GetSupplierGroupByPayload<T extends SupplierGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupplierGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupplierGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupplierGroupByOutputType[P]>
            : GetScalarType<T[P], SupplierGroupByOutputType[P]>
        }
      >
    >


  export type SupplierSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    gstNumber?: boolean
    fssaiLicense?: boolean
    houseNo?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    district?: boolean
    state?: boolean
    stateCode?: boolean
    country?: boolean
    pincode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    orders?: boolean | Supplier$ordersArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supplier"]>



  export type SupplierSelectScalar = {
    id?: boolean
    type?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    gstNumber?: boolean
    fssaiLicense?: boolean
    houseNo?: boolean
    line1?: boolean
    line2?: boolean
    city?: boolean
    district?: boolean
    state?: boolean
    stateCode?: boolean
    country?: boolean
    pincode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SupplierOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "name" | "phone" | "email" | "gstNumber" | "fssaiLicense" | "houseNo" | "line1" | "line2" | "city" | "district" | "state" | "stateCode" | "country" | "pincode" | "createdAt" | "updatedAt", ExtArgs["result"]["supplier"]>
  export type SupplierInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | Supplier$ordersArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SupplierPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Supplier"
    objects: {
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      name: string
      phone: string
      email: string
      gstNumber: string | null
      fssaiLicense: string | null
      houseNo: string
      line1: string
      line2: string | null
      city: string
      district: string
      state: string
      stateCode: string | null
      country: string
      pincode: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["supplier"]>
    composites: {}
  }

  type SupplierGetPayload<S extends boolean | null | undefined | SupplierDefaultArgs> = $Result.GetResult<Prisma.$SupplierPayload, S>

  type SupplierCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SupplierFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SupplierCountAggregateInputType | true
    }

  export interface SupplierDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Supplier'], meta: { name: 'Supplier' } }
    /**
     * Find zero or one Supplier that matches the filter.
     * @param {SupplierFindUniqueArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupplierFindUniqueArgs>(args: SelectSubset<T, SupplierFindUniqueArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Supplier that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SupplierFindUniqueOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupplierFindUniqueOrThrowArgs>(args: SelectSubset<T, SupplierFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Supplier that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupplierFindFirstArgs>(args?: SelectSubset<T, SupplierFindFirstArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Supplier that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupplierFindFirstOrThrowArgs>(args?: SelectSubset<T, SupplierFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Suppliers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Suppliers
     * const suppliers = await prisma.supplier.findMany()
     * 
     * // Get first 10 Suppliers
     * const suppliers = await prisma.supplier.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supplierWithIdOnly = await prisma.supplier.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupplierFindManyArgs>(args?: SelectSubset<T, SupplierFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Supplier.
     * @param {SupplierCreateArgs} args - Arguments to create a Supplier.
     * @example
     * // Create one Supplier
     * const Supplier = await prisma.supplier.create({
     *   data: {
     *     // ... data to create a Supplier
     *   }
     * })
     * 
     */
    create<T extends SupplierCreateArgs>(args: SelectSubset<T, SupplierCreateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Suppliers.
     * @param {SupplierCreateManyArgs} args - Arguments to create many Suppliers.
     * @example
     * // Create many Suppliers
     * const supplier = await prisma.supplier.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupplierCreateManyArgs>(args?: SelectSubset<T, SupplierCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Supplier.
     * @param {SupplierDeleteArgs} args - Arguments to delete one Supplier.
     * @example
     * // Delete one Supplier
     * const Supplier = await prisma.supplier.delete({
     *   where: {
     *     // ... filter to delete one Supplier
     *   }
     * })
     * 
     */
    delete<T extends SupplierDeleteArgs>(args: SelectSubset<T, SupplierDeleteArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Supplier.
     * @param {SupplierUpdateArgs} args - Arguments to update one Supplier.
     * @example
     * // Update one Supplier
     * const supplier = await prisma.supplier.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupplierUpdateArgs>(args: SelectSubset<T, SupplierUpdateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Suppliers.
     * @param {SupplierDeleteManyArgs} args - Arguments to filter Suppliers to delete.
     * @example
     * // Delete a few Suppliers
     * const { count } = await prisma.supplier.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupplierDeleteManyArgs>(args?: SelectSubset<T, SupplierDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Suppliers
     * const supplier = await prisma.supplier.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupplierUpdateManyArgs>(args: SelectSubset<T, SupplierUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Supplier.
     * @param {SupplierUpsertArgs} args - Arguments to update or create a Supplier.
     * @example
     * // Update or create a Supplier
     * const supplier = await prisma.supplier.upsert({
     *   create: {
     *     // ... data to create a Supplier
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Supplier we want to update
     *   }
     * })
     */
    upsert<T extends SupplierUpsertArgs>(args: SelectSubset<T, SupplierUpsertArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierCountArgs} args - Arguments to filter Suppliers to count.
     * @example
     * // Count the number of Suppliers
     * const count = await prisma.supplier.count({
     *   where: {
     *     // ... the filter for the Suppliers we want to count
     *   }
     * })
    **/
    count<T extends SupplierCountArgs>(
      args?: Subset<T, SupplierCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupplierCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SupplierAggregateArgs>(args: Subset<T, SupplierAggregateArgs>): Prisma.PrismaPromise<GetSupplierAggregateType<T>>

    /**
     * Group by Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierGroupByArgs} args - Group by arguments.
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
      T extends SupplierGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupplierGroupByArgs['orderBy'] }
        : { orderBy?: SupplierGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SupplierGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplierGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Supplier model
   */
  readonly fields: SupplierFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Supplier.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupplierClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orders<T extends Supplier$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Supplier$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Supplier model
   */
  interface SupplierFieldRefs {
    readonly id: FieldRef<"Supplier", 'String'>
    readonly type: FieldRef<"Supplier", 'String'>
    readonly name: FieldRef<"Supplier", 'String'>
    readonly phone: FieldRef<"Supplier", 'String'>
    readonly email: FieldRef<"Supplier", 'String'>
    readonly gstNumber: FieldRef<"Supplier", 'String'>
    readonly fssaiLicense: FieldRef<"Supplier", 'String'>
    readonly houseNo: FieldRef<"Supplier", 'String'>
    readonly line1: FieldRef<"Supplier", 'String'>
    readonly line2: FieldRef<"Supplier", 'String'>
    readonly city: FieldRef<"Supplier", 'String'>
    readonly district: FieldRef<"Supplier", 'String'>
    readonly state: FieldRef<"Supplier", 'String'>
    readonly stateCode: FieldRef<"Supplier", 'String'>
    readonly country: FieldRef<"Supplier", 'String'>
    readonly pincode: FieldRef<"Supplier", 'String'>
    readonly createdAt: FieldRef<"Supplier", 'DateTime'>
    readonly updatedAt: FieldRef<"Supplier", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Supplier findUnique
   */
  export type SupplierFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findUniqueOrThrow
   */
  export type SupplierFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findFirst
   */
  export type SupplierFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findFirstOrThrow
   */
  export type SupplierFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findMany
   */
  export type SupplierFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Suppliers to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier create
   */
  export type SupplierCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to create a Supplier.
     */
    data: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
  }

  /**
   * Supplier createMany
   */
  export type SupplierCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Suppliers.
     */
    data: SupplierCreateManyInput | SupplierCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Supplier update
   */
  export type SupplierUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to update a Supplier.
     */
    data: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
    /**
     * Choose, which Supplier to update.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier updateMany
   */
  export type SupplierUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Suppliers.
     */
    data: XOR<SupplierUpdateManyMutationInput, SupplierUncheckedUpdateManyInput>
    /**
     * Filter which Suppliers to update
     */
    where?: SupplierWhereInput
    /**
     * Limit how many Suppliers to update.
     */
    limit?: number
  }

  /**
   * Supplier upsert
   */
  export type SupplierUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The filter to search for the Supplier to update in case it exists.
     */
    where: SupplierWhereUniqueInput
    /**
     * In case the Supplier found by the `where` argument doesn't exist, create a new Supplier with this data.
     */
    create: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
    /**
     * In case the Supplier was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
  }

  /**
   * Supplier delete
   */
  export type SupplierDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter which Supplier to delete.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier deleteMany
   */
  export type SupplierDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suppliers to delete
     */
    where?: SupplierWhereInput
    /**
     * Limit how many Suppliers to delete.
     */
    limit?: number
  }

  /**
   * Supplier.orders
   */
  export type Supplier$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Supplier without action
   */
  export type SupplierDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Supplier
     */
    omit?: SupplierOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    suspended: 'suspended',
    suspended_number: 'suspended_number',
    terminated: 'terminated',
    isBusinessAccount: 'isBusinessAccount',
    businessName: 'businessName',
    gstNumber: 'gstNumber',
    hasAdditionalTradeName: 'hasAdditionalTradeName',
    additionalTradeName: 'additionalTradeName',
    phone: 'phone',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const OtpVerificationScalarFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token',
    otp: 'otp',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OtpVerificationScalarFieldEnum = (typeof OtpVerificationScalarFieldEnum)[keyof typeof OtpVerificationScalarFieldEnum]


  export const CartScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    productId: 'productId',
    quantity: 'quantity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CartScalarFieldEnum = (typeof CartScalarFieldEnum)[keyof typeof CartScalarFieldEnum]


  export const BulkCartScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    productId: 'productId',
    quantity: 'quantity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BulkCartScalarFieldEnum = (typeof BulkCartScalarFieldEnum)[keyof typeof BulkCartScalarFieldEnum]


  export const AddressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    name: 'name',
    phone: 'phone',
    houseNo: 'houseNo',
    line1: 'line1',
    line2: 'line2',
    city: 'city',
    district: 'district',
    state: 'state',
    stateCode: 'stateCode',
    country: 'country',
    pincode: 'pincode',
    isDefault: 'isDefault',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    orderBy: 'orderBy',
    orderDate: 'orderDate',
    status: 'status',
    totalAmount: 'totalAmount',
    discountAmount: 'discountAmount',
    paidAmount: 'paidAmount',
    packed: 'packed',
    refund: 'refund',
    customOrder: 'customOrder',
    r_orderId: 'r_orderId',
    r_paymentId: 'r_paymentId',
    paymentLinkUrl: 'paymentLinkUrl',
    paymentMethod: 'paymentMethod',
    paymentBank: 'paymentBank',
    paymentVpa: 'paymentVpa',
    courierId: 'courierId',
    shippingId: 'shippingId',
    shippingOrderId: 'shippingOrderId',
    shippingAmount: 'shippingAmount',
    awsCode: 'awsCode',
    shippingInvoiceNumber: 'shippingInvoiceNumber',
    shippingCourierName: 'shippingCourierName',
    estimatedDeliveryDate: 'estimatedDeliveryDate',
    pickupScheduled: 'pickupScheduled',
    deliveredAt: 'deliveredAt',
    manifestGenerated: 'manifestGenerated',
    InvoiceNumber: 'InvoiceNumber',
    invoiceType: 'invoiceType',
    invoiceSequenceNumber: 'invoiceSequenceNumber',
    deliveryCharge: 'deliveryCharge',
    deliveryPartner: 'deliveryPartner',
    deliveryPartnerName: 'deliveryPartnerName',
    roundedOffAmount: 'roundedOffAmount',
    invoiceAmount: 'invoiceAmount',
    refundId: 'refundId',
    refundReceipt: 'refundReceipt',
    refundArn: 'refundArn',
    refundCreatedAt: 'refundCreatedAt',
    isDifferentSupplier: 'isDifferentSupplier',
    supplierId: 'supplierId',
    shippingAddressId: 'shippingAddressId'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    quantity: 'quantity',
    price: 'price',
    discount: 'discount',
    tax: 'tax'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const PasswordResetScalarFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type PasswordResetScalarFieldEnum = (typeof PasswordResetScalarFieldEnum)[keyof typeof PasswordResetScalarFieldEnum]


  export const ContactScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phoneNumber: 'phoneNumber',
    message: 'message',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ContactScalarFieldEnum = (typeof ContactScalarFieldEnum)[keyof typeof ContactScalarFieldEnum]


  export const FeedbackScalarFieldEnum: {
    id: 'id',
    message: 'message',
    createdAt: 'createdAt'
  };

  export type FeedbackScalarFieldEnum = (typeof FeedbackScalarFieldEnum)[keyof typeof FeedbackScalarFieldEnum]


  export const AnnouncementScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AnnouncementScalarFieldEnum = (typeof AnnouncementScalarFieldEnum)[keyof typeof AnnouncementScalarFieldEnum]


  export const PopupAnnouncementScalarFieldEnum: {
    id: 'id',
    isActive: 'isActive',
    title: 'title',
    message: 'message',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PopupAnnouncementScalarFieldEnum = (typeof PopupAnnouncementScalarFieldEnum)[keyof typeof PopupAnnouncementScalarFieldEnum]


  export const SuspensionReasonScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    reason: 'reason',
    suspendedAt: 'suspendedAt'
  };

  export type SuspensionReasonScalarFieldEnum = (typeof SuspensionReasonScalarFieldEnum)[keyof typeof SuspensionReasonScalarFieldEnum]


  export const BillingAddressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    houseNo: 'houseNo',
    line1: 'line1',
    line2: 'line2',
    city: 'city',
    district: 'district',
    state: 'state',
    stateCode: 'stateCode',
    country: 'country',
    pincode: 'pincode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BillingAddressScalarFieldEnum = (typeof BillingAddressScalarFieldEnum)[keyof typeof BillingAddressScalarFieldEnum]


  export const SupplierScalarFieldEnum: {
    id: 'id',
    type: 'type',
    name: 'name',
    phone: 'phone',
    email: 'email',
    gstNumber: 'gstNumber',
    fssaiLicense: 'fssaiLicense',
    houseNo: 'houseNo',
    line1: 'line1',
    line2: 'line2',
    city: 'city',
    district: 'district',
    state: 'state',
    stateCode: 'stateCode',
    country: 'country',
    pincode: 'pincode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SupplierScalarFieldEnum = (typeof SupplierScalarFieldEnum)[keyof typeof SupplierScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    businessName: 'businessName',
    gstNumber: 'gstNumber',
    additionalTradeName: 'additionalTradeName',
    phone: 'phone',
    password: 'password'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const OtpVerificationOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token',
    otp: 'otp'
  };

  export type OtpVerificationOrderByRelevanceFieldEnum = (typeof OtpVerificationOrderByRelevanceFieldEnum)[keyof typeof OtpVerificationOrderByRelevanceFieldEnum]


  export const CartOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    productId: 'productId'
  };

  export type CartOrderByRelevanceFieldEnum = (typeof CartOrderByRelevanceFieldEnum)[keyof typeof CartOrderByRelevanceFieldEnum]


  export const BulkCartOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    productId: 'productId'
  };

  export type BulkCartOrderByRelevanceFieldEnum = (typeof BulkCartOrderByRelevanceFieldEnum)[keyof typeof BulkCartOrderByRelevanceFieldEnum]


  export const AddressOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    name: 'name',
    phone: 'phone',
    houseNo: 'houseNo',
    line1: 'line1',
    line2: 'line2',
    city: 'city',
    district: 'district',
    state: 'state',
    stateCode: 'stateCode',
    country: 'country',
    pincode: 'pincode'
  };

  export type AddressOrderByRelevanceFieldEnum = (typeof AddressOrderByRelevanceFieldEnum)[keyof typeof AddressOrderByRelevanceFieldEnum]


  export const OrderOrderByRelevanceFieldEnum: {
    id: 'id',
    orderBy: 'orderBy',
    r_orderId: 'r_orderId',
    r_paymentId: 'r_paymentId',
    paymentLinkUrl: 'paymentLinkUrl',
    paymentMethod: 'paymentMethod',
    paymentBank: 'paymentBank',
    paymentVpa: 'paymentVpa',
    shippingId: 'shippingId',
    shippingOrderId: 'shippingOrderId',
    awsCode: 'awsCode',
    shippingInvoiceNumber: 'shippingInvoiceNumber',
    shippingCourierName: 'shippingCourierName',
    estimatedDeliveryDate: 'estimatedDeliveryDate',
    InvoiceNumber: 'InvoiceNumber',
    invoiceType: 'invoiceType',
    deliveryPartner: 'deliveryPartner',
    deliveryPartnerName: 'deliveryPartnerName',
    refundId: 'refundId',
    refundReceipt: 'refundReceipt',
    refundArn: 'refundArn',
    supplierId: 'supplierId',
    shippingAddressId: 'shippingAddressId'
  };

  export type OrderOrderByRelevanceFieldEnum = (typeof OrderOrderByRelevanceFieldEnum)[keyof typeof OrderOrderByRelevanceFieldEnum]


  export const OrderItemOrderByRelevanceFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId'
  };

  export type OrderItemOrderByRelevanceFieldEnum = (typeof OrderItemOrderByRelevanceFieldEnum)[keyof typeof OrderItemOrderByRelevanceFieldEnum]


  export const PasswordResetOrderByRelevanceFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId'
  };

  export type PasswordResetOrderByRelevanceFieldEnum = (typeof PasswordResetOrderByRelevanceFieldEnum)[keyof typeof PasswordResetOrderByRelevanceFieldEnum]


  export const ContactOrderByRelevanceFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phoneNumber: 'phoneNumber',
    message: 'message'
  };

  export type ContactOrderByRelevanceFieldEnum = (typeof ContactOrderByRelevanceFieldEnum)[keyof typeof ContactOrderByRelevanceFieldEnum]


  export const FeedbackOrderByRelevanceFieldEnum: {
    id: 'id',
    message: 'message'
  };

  export type FeedbackOrderByRelevanceFieldEnum = (typeof FeedbackOrderByRelevanceFieldEnum)[keyof typeof FeedbackOrderByRelevanceFieldEnum]


  export const AnnouncementOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    createdBy: 'createdBy'
  };

  export type AnnouncementOrderByRelevanceFieldEnum = (typeof AnnouncementOrderByRelevanceFieldEnum)[keyof typeof AnnouncementOrderByRelevanceFieldEnum]


  export const PopupAnnouncementOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    message: 'message'
  };

  export type PopupAnnouncementOrderByRelevanceFieldEnum = (typeof PopupAnnouncementOrderByRelevanceFieldEnum)[keyof typeof PopupAnnouncementOrderByRelevanceFieldEnum]


  export const SuspensionReasonOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    reason: 'reason'
  };

  export type SuspensionReasonOrderByRelevanceFieldEnum = (typeof SuspensionReasonOrderByRelevanceFieldEnum)[keyof typeof SuspensionReasonOrderByRelevanceFieldEnum]


  export const BillingAddressOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    houseNo: 'houseNo',
    line1: 'line1',
    line2: 'line2',
    city: 'city',
    district: 'district',
    state: 'state',
    stateCode: 'stateCode',
    country: 'country',
    pincode: 'pincode'
  };

  export type BillingAddressOrderByRelevanceFieldEnum = (typeof BillingAddressOrderByRelevanceFieldEnum)[keyof typeof BillingAddressOrderByRelevanceFieldEnum]


  export const SupplierOrderByRelevanceFieldEnum: {
    id: 'id',
    type: 'type',
    name: 'name',
    phone: 'phone',
    email: 'email',
    gstNumber: 'gstNumber',
    fssaiLicense: 'fssaiLicense',
    houseNo: 'houseNo',
    line1: 'line1',
    line2: 'line2',
    city: 'city',
    district: 'district',
    state: 'state',
    stateCode: 'stateCode',
    country: 'country',
    pincode: 'pincode'
  };

  export type SupplierOrderByRelevanceFieldEnum = (typeof SupplierOrderByRelevanceFieldEnum)[keyof typeof SupplierOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    suspended?: BoolFilter<"User"> | boolean
    suspended_number?: IntFilter<"User"> | number
    terminated?: BoolFilter<"User"> | boolean
    isBusinessAccount?: BoolNullableFilter<"User"> | boolean | null
    businessName?: StringNullableFilter<"User"> | string | null
    gstNumber?: StringNullableFilter<"User"> | string | null
    hasAdditionalTradeName?: BoolNullableFilter<"User"> | boolean | null
    additionalTradeName?: StringNullableFilter<"User"> | string | null
    phone?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    cart?: CartListRelationFilter
    bulkCart?: BulkCartListRelationFilter
    addresses?: AddressListRelationFilter
    order?: OrderListRelationFilter
    passwordReset?: PasswordResetListRelationFilter
    suspensionReasons?: SuspensionReasonListRelationFilter
    billingAddress?: XOR<BillingAddressNullableScalarRelationFilter, BillingAddressWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    suspended?: SortOrder
    suspended_number?: SortOrder
    terminated?: SortOrder
    isBusinessAccount?: SortOrderInput | SortOrder
    businessName?: SortOrderInput | SortOrder
    gstNumber?: SortOrderInput | SortOrder
    hasAdditionalTradeName?: SortOrderInput | SortOrder
    additionalTradeName?: SortOrderInput | SortOrder
    phone?: SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cart?: CartOrderByRelationAggregateInput
    bulkCart?: BulkCartOrderByRelationAggregateInput
    addresses?: AddressOrderByRelationAggregateInput
    order?: OrderOrderByRelationAggregateInput
    passwordReset?: PasswordResetOrderByRelationAggregateInput
    suspensionReasons?: SuspensionReasonOrderByRelationAggregateInput
    billingAddress?: BillingAddressOrderByWithRelationInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    suspended?: BoolFilter<"User"> | boolean
    suspended_number?: IntFilter<"User"> | number
    terminated?: BoolFilter<"User"> | boolean
    isBusinessAccount?: BoolNullableFilter<"User"> | boolean | null
    businessName?: StringNullableFilter<"User"> | string | null
    gstNumber?: StringNullableFilter<"User"> | string | null
    hasAdditionalTradeName?: BoolNullableFilter<"User"> | boolean | null
    additionalTradeName?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    cart?: CartListRelationFilter
    bulkCart?: BulkCartListRelationFilter
    addresses?: AddressListRelationFilter
    order?: OrderListRelationFilter
    passwordReset?: PasswordResetListRelationFilter
    suspensionReasons?: SuspensionReasonListRelationFilter
    billingAddress?: XOR<BillingAddressNullableScalarRelationFilter, BillingAddressWhereInput> | null
  }, "id" | "email" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    suspended?: SortOrder
    suspended_number?: SortOrder
    terminated?: SortOrder
    isBusinessAccount?: SortOrderInput | SortOrder
    businessName?: SortOrderInput | SortOrder
    gstNumber?: SortOrderInput | SortOrder
    hasAdditionalTradeName?: SortOrderInput | SortOrder
    additionalTradeName?: SortOrderInput | SortOrder
    phone?: SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    suspended?: BoolWithAggregatesFilter<"User"> | boolean
    suspended_number?: IntWithAggregatesFilter<"User"> | number
    terminated?: BoolWithAggregatesFilter<"User"> | boolean
    isBusinessAccount?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    businessName?: StringNullableWithAggregatesFilter<"User"> | string | null
    gstNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    hasAdditionalTradeName?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    additionalTradeName?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type OtpVerificationWhereInput = {
    AND?: OtpVerificationWhereInput | OtpVerificationWhereInput[]
    OR?: OtpVerificationWhereInput[]
    NOT?: OtpVerificationWhereInput | OtpVerificationWhereInput[]
    id?: StringFilter<"OtpVerification"> | string
    email?: StringNullableFilter<"OtpVerification"> | string | null
    token?: StringFilter<"OtpVerification"> | string
    otp?: StringFilter<"OtpVerification"> | string
    expiresAt?: DateTimeFilter<"OtpVerification"> | Date | string
    createdAt?: DateTimeFilter<"OtpVerification"> | Date | string
    updatedAt?: DateTimeFilter<"OtpVerification"> | Date | string
  }

  export type OtpVerificationOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    token?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: OtpVerificationOrderByRelevanceInput
  }

  export type OtpVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: OtpVerificationWhereInput | OtpVerificationWhereInput[]
    OR?: OtpVerificationWhereInput[]
    NOT?: OtpVerificationWhereInput | OtpVerificationWhereInput[]
    email?: StringNullableFilter<"OtpVerification"> | string | null
    otp?: StringFilter<"OtpVerification"> | string
    expiresAt?: DateTimeFilter<"OtpVerification"> | Date | string
    createdAt?: DateTimeFilter<"OtpVerification"> | Date | string
    updatedAt?: DateTimeFilter<"OtpVerification"> | Date | string
  }, "id" | "token">

  export type OtpVerificationOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    token?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OtpVerificationCountOrderByAggregateInput
    _max?: OtpVerificationMaxOrderByAggregateInput
    _min?: OtpVerificationMinOrderByAggregateInput
  }

  export type OtpVerificationScalarWhereWithAggregatesInput = {
    AND?: OtpVerificationScalarWhereWithAggregatesInput | OtpVerificationScalarWhereWithAggregatesInput[]
    OR?: OtpVerificationScalarWhereWithAggregatesInput[]
    NOT?: OtpVerificationScalarWhereWithAggregatesInput | OtpVerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OtpVerification"> | string
    email?: StringNullableWithAggregatesFilter<"OtpVerification"> | string | null
    token?: StringWithAggregatesFilter<"OtpVerification"> | string
    otp?: StringWithAggregatesFilter<"OtpVerification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"OtpVerification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"OtpVerification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OtpVerification"> | Date | string
  }

  export type CartWhereInput = {
    AND?: CartWhereInput | CartWhereInput[]
    OR?: CartWhereInput[]
    NOT?: CartWhereInput | CartWhereInput[]
    id?: StringFilter<"Cart"> | string
    userId?: StringFilter<"Cart"> | string
    productId?: StringFilter<"Cart"> | string
    quantity?: IntFilter<"Cart"> | number
    createdAt?: DateTimeFilter<"Cart"> | Date | string
    updatedAt?: DateTimeFilter<"Cart"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CartOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: CartOrderByRelevanceInput
  }

  export type CartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CartWhereInput | CartWhereInput[]
    OR?: CartWhereInput[]
    NOT?: CartWhereInput | CartWhereInput[]
    userId?: StringFilter<"Cart"> | string
    productId?: StringFilter<"Cart"> | string
    quantity?: IntFilter<"Cart"> | number
    createdAt?: DateTimeFilter<"Cart"> | Date | string
    updatedAt?: DateTimeFilter<"Cart"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CartOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CartCountOrderByAggregateInput
    _avg?: CartAvgOrderByAggregateInput
    _max?: CartMaxOrderByAggregateInput
    _min?: CartMinOrderByAggregateInput
    _sum?: CartSumOrderByAggregateInput
  }

  export type CartScalarWhereWithAggregatesInput = {
    AND?: CartScalarWhereWithAggregatesInput | CartScalarWhereWithAggregatesInput[]
    OR?: CartScalarWhereWithAggregatesInput[]
    NOT?: CartScalarWhereWithAggregatesInput | CartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Cart"> | string
    userId?: StringWithAggregatesFilter<"Cart"> | string
    productId?: StringWithAggregatesFilter<"Cart"> | string
    quantity?: IntWithAggregatesFilter<"Cart"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Cart"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Cart"> | Date | string
  }

  export type BulkCartWhereInput = {
    AND?: BulkCartWhereInput | BulkCartWhereInput[]
    OR?: BulkCartWhereInput[]
    NOT?: BulkCartWhereInput | BulkCartWhereInput[]
    id?: StringFilter<"BulkCart"> | string
    userId?: StringFilter<"BulkCart"> | string
    productId?: StringFilter<"BulkCart"> | string
    quantity?: IntFilter<"BulkCart"> | number
    createdAt?: DateTimeFilter<"BulkCart"> | Date | string
    updatedAt?: DateTimeFilter<"BulkCart"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BulkCartOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: BulkCartOrderByRelevanceInput
  }

  export type BulkCartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BulkCartWhereInput | BulkCartWhereInput[]
    OR?: BulkCartWhereInput[]
    NOT?: BulkCartWhereInput | BulkCartWhereInput[]
    userId?: StringFilter<"BulkCart"> | string
    productId?: StringFilter<"BulkCart"> | string
    quantity?: IntFilter<"BulkCart"> | number
    createdAt?: DateTimeFilter<"BulkCart"> | Date | string
    updatedAt?: DateTimeFilter<"BulkCart"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type BulkCartOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BulkCartCountOrderByAggregateInput
    _avg?: BulkCartAvgOrderByAggregateInput
    _max?: BulkCartMaxOrderByAggregateInput
    _min?: BulkCartMinOrderByAggregateInput
    _sum?: BulkCartSumOrderByAggregateInput
  }

  export type BulkCartScalarWhereWithAggregatesInput = {
    AND?: BulkCartScalarWhereWithAggregatesInput | BulkCartScalarWhereWithAggregatesInput[]
    OR?: BulkCartScalarWhereWithAggregatesInput[]
    NOT?: BulkCartScalarWhereWithAggregatesInput | BulkCartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BulkCart"> | string
    userId?: StringWithAggregatesFilter<"BulkCart"> | string
    productId?: StringWithAggregatesFilter<"BulkCart"> | string
    quantity?: IntWithAggregatesFilter<"BulkCart"> | number
    createdAt?: DateTimeWithAggregatesFilter<"BulkCart"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BulkCart"> | Date | string
  }

  export type AddressWhereInput = {
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    id?: StringFilter<"Address"> | string
    userId?: StringFilter<"Address"> | string
    type?: StringFilter<"Address"> | string
    name?: StringFilter<"Address"> | string
    phone?: StringFilter<"Address"> | string
    houseNo?: StringFilter<"Address"> | string
    line1?: StringFilter<"Address"> | string
    line2?: StringNullableFilter<"Address"> | string | null
    city?: StringFilter<"Address"> | string
    district?: StringFilter<"Address"> | string
    state?: StringFilter<"Address"> | string
    stateCode?: StringNullableFilter<"Address"> | string | null
    country?: StringFilter<"Address"> | string
    pincode?: StringFilter<"Address"> | string
    isDefault?: BoolFilter<"Address"> | boolean
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    orders?: OrderListRelationFilter
  }

  export type AddressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    houseNo?: SortOrder
    line1?: SortOrder
    line2?: SortOrderInput | SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    stateCode?: SortOrderInput | SortOrder
    country?: SortOrder
    pincode?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
    _relevance?: AddressOrderByRelevanceInput
  }

  export type AddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    userId?: StringFilter<"Address"> | string
    type?: StringFilter<"Address"> | string
    name?: StringFilter<"Address"> | string
    phone?: StringFilter<"Address"> | string
    houseNo?: StringFilter<"Address"> | string
    line1?: StringFilter<"Address"> | string
    line2?: StringNullableFilter<"Address"> | string | null
    city?: StringFilter<"Address"> | string
    district?: StringFilter<"Address"> | string
    state?: StringFilter<"Address"> | string
    stateCode?: StringNullableFilter<"Address"> | string | null
    country?: StringFilter<"Address"> | string
    pincode?: StringFilter<"Address"> | string
    isDefault?: BoolFilter<"Address"> | boolean
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    orders?: OrderListRelationFilter
  }, "id">

  export type AddressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    houseNo?: SortOrder
    line1?: SortOrder
    line2?: SortOrderInput | SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    stateCode?: SortOrderInput | SortOrder
    country?: SortOrder
    pincode?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AddressCountOrderByAggregateInput
    _max?: AddressMaxOrderByAggregateInput
    _min?: AddressMinOrderByAggregateInput
  }

  export type AddressScalarWhereWithAggregatesInput = {
    AND?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    OR?: AddressScalarWhereWithAggregatesInput[]
    NOT?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Address"> | string
    userId?: StringWithAggregatesFilter<"Address"> | string
    type?: StringWithAggregatesFilter<"Address"> | string
    name?: StringWithAggregatesFilter<"Address"> | string
    phone?: StringWithAggregatesFilter<"Address"> | string
    houseNo?: StringWithAggregatesFilter<"Address"> | string
    line1?: StringWithAggregatesFilter<"Address"> | string
    line2?: StringNullableWithAggregatesFilter<"Address"> | string | null
    city?: StringWithAggregatesFilter<"Address"> | string
    district?: StringWithAggregatesFilter<"Address"> | string
    state?: StringWithAggregatesFilter<"Address"> | string
    stateCode?: StringNullableWithAggregatesFilter<"Address"> | string | null
    country?: StringWithAggregatesFilter<"Address"> | string
    pincode?: StringWithAggregatesFilter<"Address"> | string
    isDefault?: BoolWithAggregatesFilter<"Address"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Address"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Address"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    orderBy?: StringFilter<"Order"> | string
    orderDate?: DateTimeFilter<"Order"> | Date | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    totalAmount?: FloatFilter<"Order"> | number
    discountAmount?: FloatNullableFilter<"Order"> | number | null
    paidAmount?: FloatNullableFilter<"Order"> | number | null
    packed?: BoolFilter<"Order"> | boolean
    refund?: BoolFilter<"Order"> | boolean
    customOrder?: BoolFilter<"Order"> | boolean
    r_orderId?: StringNullableFilter<"Order"> | string | null
    r_paymentId?: StringNullableFilter<"Order"> | string | null
    paymentLinkUrl?: StringNullableFilter<"Order"> | string | null
    paymentMethod?: StringNullableFilter<"Order"> | string | null
    paymentBank?: StringNullableFilter<"Order"> | string | null
    paymentVpa?: StringNullableFilter<"Order"> | string | null
    courierId?: IntNullableFilter<"Order"> | number | null
    shippingId?: StringNullableFilter<"Order"> | string | null
    shippingOrderId?: StringNullableFilter<"Order"> | string | null
    shippingAmount?: FloatNullableFilter<"Order"> | number | null
    awsCode?: StringNullableFilter<"Order"> | string | null
    shippingInvoiceNumber?: StringNullableFilter<"Order"> | string | null
    shippingCourierName?: StringNullableFilter<"Order"> | string | null
    estimatedDeliveryDate?: StringNullableFilter<"Order"> | string | null
    pickupScheduled?: DateTimeNullableFilter<"Order"> | Date | string | null
    deliveredAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    manifestGenerated?: BoolNullableFilter<"Order"> | boolean | null
    InvoiceNumber?: StringNullableFilter<"Order"> | string | null
    invoiceType?: StringNullableFilter<"Order"> | string | null
    invoiceSequenceNumber?: IntNullableFilter<"Order"> | number | null
    deliveryCharge?: FloatNullableFilter<"Order"> | number | null
    deliveryPartner?: StringNullableFilter<"Order"> | string | null
    deliveryPartnerName?: StringNullableFilter<"Order"> | string | null
    roundedOffAmount?: FloatNullableFilter<"Order"> | number | null
    invoiceAmount?: FloatNullableFilter<"Order"> | number | null
    refundId?: StringNullableFilter<"Order"> | string | null
    refundReceipt?: StringNullableFilter<"Order"> | string | null
    refundArn?: StringNullableFilter<"Order"> | string | null
    refundCreatedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    isDifferentSupplier?: BoolNullableFilter<"Order"> | boolean | null
    supplierId?: StringNullableFilter<"Order"> | string | null
    shippingAddressId?: StringNullableFilter<"Order"> | string | null
    supplier?: XOR<SupplierNullableScalarRelationFilter, SupplierWhereInput> | null
    orderItems?: OrderItemListRelationFilter
    shippingAddress?: XOR<AddressNullableScalarRelationFilter, AddressWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    orderBy?: SortOrder
    orderDate?: SortOrder
    status?: SortOrder
    totalAmount?: SortOrder
    discountAmount?: SortOrderInput | SortOrder
    paidAmount?: SortOrderInput | SortOrder
    packed?: SortOrder
    refund?: SortOrder
    customOrder?: SortOrder
    r_orderId?: SortOrderInput | SortOrder
    r_paymentId?: SortOrderInput | SortOrder
    paymentLinkUrl?: SortOrderInput | SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    paymentBank?: SortOrderInput | SortOrder
    paymentVpa?: SortOrderInput | SortOrder
    courierId?: SortOrderInput | SortOrder
    shippingId?: SortOrderInput | SortOrder
    shippingOrderId?: SortOrderInput | SortOrder
    shippingAmount?: SortOrderInput | SortOrder
    awsCode?: SortOrderInput | SortOrder
    shippingInvoiceNumber?: SortOrderInput | SortOrder
    shippingCourierName?: SortOrderInput | SortOrder
    estimatedDeliveryDate?: SortOrderInput | SortOrder
    pickupScheduled?: SortOrderInput | SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    manifestGenerated?: SortOrderInput | SortOrder
    InvoiceNumber?: SortOrderInput | SortOrder
    invoiceType?: SortOrderInput | SortOrder
    invoiceSequenceNumber?: SortOrderInput | SortOrder
    deliveryCharge?: SortOrderInput | SortOrder
    deliveryPartner?: SortOrderInput | SortOrder
    deliveryPartnerName?: SortOrderInput | SortOrder
    roundedOffAmount?: SortOrderInput | SortOrder
    invoiceAmount?: SortOrderInput | SortOrder
    refundId?: SortOrderInput | SortOrder
    refundReceipt?: SortOrderInput | SortOrder
    refundArn?: SortOrderInput | SortOrder
    refundCreatedAt?: SortOrderInput | SortOrder
    isDifferentSupplier?: SortOrderInput | SortOrder
    supplierId?: SortOrderInput | SortOrder
    shippingAddressId?: SortOrderInput | SortOrder
    supplier?: SupplierOrderByWithRelationInput
    orderItems?: OrderItemOrderByRelationAggregateInput
    shippingAddress?: AddressOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    _relevance?: OrderOrderByRelevanceInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    orderBy?: StringFilter<"Order"> | string
    orderDate?: DateTimeFilter<"Order"> | Date | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    totalAmount?: FloatFilter<"Order"> | number
    discountAmount?: FloatNullableFilter<"Order"> | number | null
    paidAmount?: FloatNullableFilter<"Order"> | number | null
    packed?: BoolFilter<"Order"> | boolean
    refund?: BoolFilter<"Order"> | boolean
    customOrder?: BoolFilter<"Order"> | boolean
    r_orderId?: StringNullableFilter<"Order"> | string | null
    r_paymentId?: StringNullableFilter<"Order"> | string | null
    paymentLinkUrl?: StringNullableFilter<"Order"> | string | null
    paymentMethod?: StringNullableFilter<"Order"> | string | null
    paymentBank?: StringNullableFilter<"Order"> | string | null
    paymentVpa?: StringNullableFilter<"Order"> | string | null
    courierId?: IntNullableFilter<"Order"> | number | null
    shippingId?: StringNullableFilter<"Order"> | string | null
    shippingOrderId?: StringNullableFilter<"Order"> | string | null
    shippingAmount?: FloatNullableFilter<"Order"> | number | null
    awsCode?: StringNullableFilter<"Order"> | string | null
    shippingInvoiceNumber?: StringNullableFilter<"Order"> | string | null
    shippingCourierName?: StringNullableFilter<"Order"> | string | null
    estimatedDeliveryDate?: StringNullableFilter<"Order"> | string | null
    pickupScheduled?: DateTimeNullableFilter<"Order"> | Date | string | null
    deliveredAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    manifestGenerated?: BoolNullableFilter<"Order"> | boolean | null
    InvoiceNumber?: StringNullableFilter<"Order"> | string | null
    invoiceType?: StringNullableFilter<"Order"> | string | null
    invoiceSequenceNumber?: IntNullableFilter<"Order"> | number | null
    deliveryCharge?: FloatNullableFilter<"Order"> | number | null
    deliveryPartner?: StringNullableFilter<"Order"> | string | null
    deliveryPartnerName?: StringNullableFilter<"Order"> | string | null
    roundedOffAmount?: FloatNullableFilter<"Order"> | number | null
    invoiceAmount?: FloatNullableFilter<"Order"> | number | null
    refundId?: StringNullableFilter<"Order"> | string | null
    refundReceipt?: StringNullableFilter<"Order"> | string | null
    refundArn?: StringNullableFilter<"Order"> | string | null
    refundCreatedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    isDifferentSupplier?: BoolNullableFilter<"Order"> | boolean | null
    supplierId?: StringNullableFilter<"Order"> | string | null
    shippingAddressId?: StringNullableFilter<"Order"> | string | null
    supplier?: XOR<SupplierNullableScalarRelationFilter, SupplierWhereInput> | null
    orderItems?: OrderItemListRelationFilter
    shippingAddress?: XOR<AddressNullableScalarRelationFilter, AddressWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    orderBy?: SortOrder
    orderDate?: SortOrder
    status?: SortOrder
    totalAmount?: SortOrder
    discountAmount?: SortOrderInput | SortOrder
    paidAmount?: SortOrderInput | SortOrder
    packed?: SortOrder
    refund?: SortOrder
    customOrder?: SortOrder
    r_orderId?: SortOrderInput | SortOrder
    r_paymentId?: SortOrderInput | SortOrder
    paymentLinkUrl?: SortOrderInput | SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    paymentBank?: SortOrderInput | SortOrder
    paymentVpa?: SortOrderInput | SortOrder
    courierId?: SortOrderInput | SortOrder
    shippingId?: SortOrderInput | SortOrder
    shippingOrderId?: SortOrderInput | SortOrder
    shippingAmount?: SortOrderInput | SortOrder
    awsCode?: SortOrderInput | SortOrder
    shippingInvoiceNumber?: SortOrderInput | SortOrder
    shippingCourierName?: SortOrderInput | SortOrder
    estimatedDeliveryDate?: SortOrderInput | SortOrder
    pickupScheduled?: SortOrderInput | SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    manifestGenerated?: SortOrderInput | SortOrder
    InvoiceNumber?: SortOrderInput | SortOrder
    invoiceType?: SortOrderInput | SortOrder
    invoiceSequenceNumber?: SortOrderInput | SortOrder
    deliveryCharge?: SortOrderInput | SortOrder
    deliveryPartner?: SortOrderInput | SortOrder
    deliveryPartnerName?: SortOrderInput | SortOrder
    roundedOffAmount?: SortOrderInput | SortOrder
    invoiceAmount?: SortOrderInput | SortOrder
    refundId?: SortOrderInput | SortOrder
    refundReceipt?: SortOrderInput | SortOrder
    refundArn?: SortOrderInput | SortOrder
    refundCreatedAt?: SortOrderInput | SortOrder
    isDifferentSupplier?: SortOrderInput | SortOrder
    supplierId?: SortOrderInput | SortOrder
    shippingAddressId?: SortOrderInput | SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    orderBy?: StringWithAggregatesFilter<"Order"> | string
    orderDate?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    totalAmount?: FloatWithAggregatesFilter<"Order"> | number
    discountAmount?: FloatNullableWithAggregatesFilter<"Order"> | number | null
    paidAmount?: FloatNullableWithAggregatesFilter<"Order"> | number | null
    packed?: BoolWithAggregatesFilter<"Order"> | boolean
    refund?: BoolWithAggregatesFilter<"Order"> | boolean
    customOrder?: BoolWithAggregatesFilter<"Order"> | boolean
    r_orderId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    r_paymentId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    paymentLinkUrl?: StringNullableWithAggregatesFilter<"Order"> | string | null
    paymentMethod?: StringNullableWithAggregatesFilter<"Order"> | string | null
    paymentBank?: StringNullableWithAggregatesFilter<"Order"> | string | null
    paymentVpa?: StringNullableWithAggregatesFilter<"Order"> | string | null
    courierId?: IntNullableWithAggregatesFilter<"Order"> | number | null
    shippingId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    shippingOrderId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    shippingAmount?: FloatNullableWithAggregatesFilter<"Order"> | number | null
    awsCode?: StringNullableWithAggregatesFilter<"Order"> | string | null
    shippingInvoiceNumber?: StringNullableWithAggregatesFilter<"Order"> | string | null
    shippingCourierName?: StringNullableWithAggregatesFilter<"Order"> | string | null
    estimatedDeliveryDate?: StringNullableWithAggregatesFilter<"Order"> | string | null
    pickupScheduled?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    deliveredAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    manifestGenerated?: BoolNullableWithAggregatesFilter<"Order"> | boolean | null
    InvoiceNumber?: StringNullableWithAggregatesFilter<"Order"> | string | null
    invoiceType?: StringNullableWithAggregatesFilter<"Order"> | string | null
    invoiceSequenceNumber?: IntNullableWithAggregatesFilter<"Order"> | number | null
    deliveryCharge?: FloatNullableWithAggregatesFilter<"Order"> | number | null
    deliveryPartner?: StringNullableWithAggregatesFilter<"Order"> | string | null
    deliveryPartnerName?: StringNullableWithAggregatesFilter<"Order"> | string | null
    roundedOffAmount?: FloatNullableWithAggregatesFilter<"Order"> | number | null
    invoiceAmount?: FloatNullableWithAggregatesFilter<"Order"> | number | null
    refundId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    refundReceipt?: StringNullableWithAggregatesFilter<"Order"> | string | null
    refundArn?: StringNullableWithAggregatesFilter<"Order"> | string | null
    refundCreatedAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    isDifferentSupplier?: BoolNullableWithAggregatesFilter<"Order"> | boolean | null
    supplierId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    shippingAddressId?: StringNullableWithAggregatesFilter<"Order"> | string | null
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    price?: FloatFilter<"OrderItem"> | number
    discount?: FloatFilter<"OrderItem"> | number
    tax?: IntFilter<"OrderItem"> | number
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    discount?: SortOrder
    tax?: SortOrder
    order?: OrderOrderByWithRelationInput
    _relevance?: OrderItemOrderByRelevanceInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    price?: FloatFilter<"OrderItem"> | number
    discount?: FloatFilter<"OrderItem"> | number
    tax?: IntFilter<"OrderItem"> | number
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    discount?: SortOrder
    tax?: SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderItem"> | string
    orderId?: StringWithAggregatesFilter<"OrderItem"> | string
    productId?: StringWithAggregatesFilter<"OrderItem"> | string
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    price?: FloatWithAggregatesFilter<"OrderItem"> | number
    discount?: FloatWithAggregatesFilter<"OrderItem"> | number
    tax?: IntWithAggregatesFilter<"OrderItem"> | number
  }

  export type PasswordResetWhereInput = {
    AND?: PasswordResetWhereInput | PasswordResetWhereInput[]
    OR?: PasswordResetWhereInput[]
    NOT?: PasswordResetWhereInput | PasswordResetWhereInput[]
    id?: StringFilter<"PasswordReset"> | string
    token?: StringFilter<"PasswordReset"> | string
    userId?: StringFilter<"PasswordReset"> | string
    expiresAt?: DateTimeFilter<"PasswordReset"> | Date | string
    createdAt?: DateTimeFilter<"PasswordReset"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PasswordResetOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: PasswordResetOrderByRelevanceInput
  }

  export type PasswordResetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: PasswordResetWhereInput | PasswordResetWhereInput[]
    OR?: PasswordResetWhereInput[]
    NOT?: PasswordResetWhereInput | PasswordResetWhereInput[]
    userId?: StringFilter<"PasswordReset"> | string
    expiresAt?: DateTimeFilter<"PasswordReset"> | Date | string
    createdAt?: DateTimeFilter<"PasswordReset"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type PasswordResetOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: PasswordResetCountOrderByAggregateInput
    _max?: PasswordResetMaxOrderByAggregateInput
    _min?: PasswordResetMinOrderByAggregateInput
  }

  export type PasswordResetScalarWhereWithAggregatesInput = {
    AND?: PasswordResetScalarWhereWithAggregatesInput | PasswordResetScalarWhereWithAggregatesInput[]
    OR?: PasswordResetScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetScalarWhereWithAggregatesInput | PasswordResetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordReset"> | string
    token?: StringWithAggregatesFilter<"PasswordReset"> | string
    userId?: StringWithAggregatesFilter<"PasswordReset"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string
  }

  export type ContactWhereInput = {
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    id?: StringFilter<"Contact"> | string
    firstName?: StringFilter<"Contact"> | string
    lastName?: StringFilter<"Contact"> | string
    email?: StringFilter<"Contact"> | string
    phoneNumber?: StringFilter<"Contact"> | string
    message?: StringFilter<"Contact"> | string
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
  }

  export type ContactOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: ContactOrderByRelevanceInput
  }

  export type ContactWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    firstName?: StringFilter<"Contact"> | string
    lastName?: StringFilter<"Contact"> | string
    email?: StringFilter<"Contact"> | string
    phoneNumber?: StringFilter<"Contact"> | string
    message?: StringFilter<"Contact"> | string
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
  }, "id">

  export type ContactOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ContactCountOrderByAggregateInput
    _max?: ContactMaxOrderByAggregateInput
    _min?: ContactMinOrderByAggregateInput
  }

  export type ContactScalarWhereWithAggregatesInput = {
    AND?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    OR?: ContactScalarWhereWithAggregatesInput[]
    NOT?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Contact"> | string
    firstName?: StringWithAggregatesFilter<"Contact"> | string
    lastName?: StringWithAggregatesFilter<"Contact"> | string
    email?: StringWithAggregatesFilter<"Contact"> | string
    phoneNumber?: StringWithAggregatesFilter<"Contact"> | string
    message?: StringWithAggregatesFilter<"Contact"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Contact"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Contact"> | Date | string
  }

  export type FeedbackWhereInput = {
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    id?: StringFilter<"Feedback"> | string
    message?: StringFilter<"Feedback"> | string
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
  }

  export type FeedbackOrderByWithRelationInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    _relevance?: FeedbackOrderByRelevanceInput
  }

  export type FeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeedbackWhereInput | FeedbackWhereInput[]
    OR?: FeedbackWhereInput[]
    NOT?: FeedbackWhereInput | FeedbackWhereInput[]
    message?: StringFilter<"Feedback"> | string
    createdAt?: DateTimeFilter<"Feedback"> | Date | string
  }, "id">

  export type FeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    _count?: FeedbackCountOrderByAggregateInput
    _max?: FeedbackMaxOrderByAggregateInput
    _min?: FeedbackMinOrderByAggregateInput
  }

  export type FeedbackScalarWhereWithAggregatesInput = {
    AND?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    OR?: FeedbackScalarWhereWithAggregatesInput[]
    NOT?: FeedbackScalarWhereWithAggregatesInput | FeedbackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Feedback"> | string
    message?: StringWithAggregatesFilter<"Feedback"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Feedback"> | Date | string
  }

  export type AnnouncementWhereInput = {
    AND?: AnnouncementWhereInput | AnnouncementWhereInput[]
    OR?: AnnouncementWhereInput[]
    NOT?: AnnouncementWhereInput | AnnouncementWhereInput[]
    id?: StringFilter<"Announcement"> | string
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    createdBy?: StringFilter<"Announcement"> | string
    createdAt?: DateTimeFilter<"Announcement"> | Date | string
    updatedAt?: DateTimeFilter<"Announcement"> | Date | string
  }

  export type AnnouncementOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: AnnouncementOrderByRelevanceInput
  }

  export type AnnouncementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnnouncementWhereInput | AnnouncementWhereInput[]
    OR?: AnnouncementWhereInput[]
    NOT?: AnnouncementWhereInput | AnnouncementWhereInput[]
    title?: StringFilter<"Announcement"> | string
    content?: StringFilter<"Announcement"> | string
    createdBy?: StringFilter<"Announcement"> | string
    createdAt?: DateTimeFilter<"Announcement"> | Date | string
    updatedAt?: DateTimeFilter<"Announcement"> | Date | string
  }, "id">

  export type AnnouncementOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AnnouncementCountOrderByAggregateInput
    _max?: AnnouncementMaxOrderByAggregateInput
    _min?: AnnouncementMinOrderByAggregateInput
  }

  export type AnnouncementScalarWhereWithAggregatesInput = {
    AND?: AnnouncementScalarWhereWithAggregatesInput | AnnouncementScalarWhereWithAggregatesInput[]
    OR?: AnnouncementScalarWhereWithAggregatesInput[]
    NOT?: AnnouncementScalarWhereWithAggregatesInput | AnnouncementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Announcement"> | string
    title?: StringWithAggregatesFilter<"Announcement"> | string
    content?: StringWithAggregatesFilter<"Announcement"> | string
    createdBy?: StringWithAggregatesFilter<"Announcement"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Announcement"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Announcement"> | Date | string
  }

  export type PopupAnnouncementWhereInput = {
    AND?: PopupAnnouncementWhereInput | PopupAnnouncementWhereInput[]
    OR?: PopupAnnouncementWhereInput[]
    NOT?: PopupAnnouncementWhereInput | PopupAnnouncementWhereInput[]
    id?: StringFilter<"PopupAnnouncement"> | string
    isActive?: BoolFilter<"PopupAnnouncement"> | boolean
    title?: StringFilter<"PopupAnnouncement"> | string
    message?: StringFilter<"PopupAnnouncement"> | string
    startDate?: DateTimeFilter<"PopupAnnouncement"> | Date | string
    endDate?: DateTimeNullableFilter<"PopupAnnouncement"> | Date | string | null
    createdAt?: DateTimeFilter<"PopupAnnouncement"> | Date | string
    updatedAt?: DateTimeFilter<"PopupAnnouncement"> | Date | string
  }

  export type PopupAnnouncementOrderByWithRelationInput = {
    id?: SortOrder
    isActive?: SortOrder
    title?: SortOrder
    message?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: PopupAnnouncementOrderByRelevanceInput
  }

  export type PopupAnnouncementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PopupAnnouncementWhereInput | PopupAnnouncementWhereInput[]
    OR?: PopupAnnouncementWhereInput[]
    NOT?: PopupAnnouncementWhereInput | PopupAnnouncementWhereInput[]
    isActive?: BoolFilter<"PopupAnnouncement"> | boolean
    title?: StringFilter<"PopupAnnouncement"> | string
    message?: StringFilter<"PopupAnnouncement"> | string
    startDate?: DateTimeFilter<"PopupAnnouncement"> | Date | string
    endDate?: DateTimeNullableFilter<"PopupAnnouncement"> | Date | string | null
    createdAt?: DateTimeFilter<"PopupAnnouncement"> | Date | string
    updatedAt?: DateTimeFilter<"PopupAnnouncement"> | Date | string
  }, "id">

  export type PopupAnnouncementOrderByWithAggregationInput = {
    id?: SortOrder
    isActive?: SortOrder
    title?: SortOrder
    message?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PopupAnnouncementCountOrderByAggregateInput
    _max?: PopupAnnouncementMaxOrderByAggregateInput
    _min?: PopupAnnouncementMinOrderByAggregateInput
  }

  export type PopupAnnouncementScalarWhereWithAggregatesInput = {
    AND?: PopupAnnouncementScalarWhereWithAggregatesInput | PopupAnnouncementScalarWhereWithAggregatesInput[]
    OR?: PopupAnnouncementScalarWhereWithAggregatesInput[]
    NOT?: PopupAnnouncementScalarWhereWithAggregatesInput | PopupAnnouncementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PopupAnnouncement"> | string
    isActive?: BoolWithAggregatesFilter<"PopupAnnouncement"> | boolean
    title?: StringWithAggregatesFilter<"PopupAnnouncement"> | string
    message?: StringWithAggregatesFilter<"PopupAnnouncement"> | string
    startDate?: DateTimeWithAggregatesFilter<"PopupAnnouncement"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"PopupAnnouncement"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PopupAnnouncement"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PopupAnnouncement"> | Date | string
  }

  export type SuspensionReasonWhereInput = {
    AND?: SuspensionReasonWhereInput | SuspensionReasonWhereInput[]
    OR?: SuspensionReasonWhereInput[]
    NOT?: SuspensionReasonWhereInput | SuspensionReasonWhereInput[]
    id?: StringFilter<"SuspensionReason"> | string
    userId?: StringFilter<"SuspensionReason"> | string
    reason?: StringFilter<"SuspensionReason"> | string
    suspendedAt?: DateTimeFilter<"SuspensionReason"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SuspensionReasonOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    reason?: SortOrder
    suspendedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: SuspensionReasonOrderByRelevanceInput
  }

  export type SuspensionReasonWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SuspensionReasonWhereInput | SuspensionReasonWhereInput[]
    OR?: SuspensionReasonWhereInput[]
    NOT?: SuspensionReasonWhereInput | SuspensionReasonWhereInput[]
    userId?: StringFilter<"SuspensionReason"> | string
    reason?: StringFilter<"SuspensionReason"> | string
    suspendedAt?: DateTimeFilter<"SuspensionReason"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SuspensionReasonOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    reason?: SortOrder
    suspendedAt?: SortOrder
    _count?: SuspensionReasonCountOrderByAggregateInput
    _max?: SuspensionReasonMaxOrderByAggregateInput
    _min?: SuspensionReasonMinOrderByAggregateInput
  }

  export type SuspensionReasonScalarWhereWithAggregatesInput = {
    AND?: SuspensionReasonScalarWhereWithAggregatesInput | SuspensionReasonScalarWhereWithAggregatesInput[]
    OR?: SuspensionReasonScalarWhereWithAggregatesInput[]
    NOT?: SuspensionReasonScalarWhereWithAggregatesInput | SuspensionReasonScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SuspensionReason"> | string
    userId?: StringWithAggregatesFilter<"SuspensionReason"> | string
    reason?: StringWithAggregatesFilter<"SuspensionReason"> | string
    suspendedAt?: DateTimeWithAggregatesFilter<"SuspensionReason"> | Date | string
  }

  export type BillingAddressWhereInput = {
    AND?: BillingAddressWhereInput | BillingAddressWhereInput[]
    OR?: BillingAddressWhereInput[]
    NOT?: BillingAddressWhereInput | BillingAddressWhereInput[]
    id?: StringFilter<"BillingAddress"> | string
    userId?: StringFilter<"BillingAddress"> | string
    houseNo?: StringFilter<"BillingAddress"> | string
    line1?: StringFilter<"BillingAddress"> | string
    line2?: StringNullableFilter<"BillingAddress"> | string | null
    city?: StringFilter<"BillingAddress"> | string
    district?: StringFilter<"BillingAddress"> | string
    state?: StringFilter<"BillingAddress"> | string
    stateCode?: StringNullableFilter<"BillingAddress"> | string | null
    country?: StringFilter<"BillingAddress"> | string
    pincode?: StringFilter<"BillingAddress"> | string
    createdAt?: DateTimeFilter<"BillingAddress"> | Date | string
    updatedAt?: DateTimeFilter<"BillingAddress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BillingAddressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    houseNo?: SortOrder
    line1?: SortOrder
    line2?: SortOrderInput | SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    stateCode?: SortOrderInput | SortOrder
    country?: SortOrder
    pincode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: BillingAddressOrderByRelevanceInput
  }

  export type BillingAddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: BillingAddressWhereInput | BillingAddressWhereInput[]
    OR?: BillingAddressWhereInput[]
    NOT?: BillingAddressWhereInput | BillingAddressWhereInput[]
    houseNo?: StringFilter<"BillingAddress"> | string
    line1?: StringFilter<"BillingAddress"> | string
    line2?: StringNullableFilter<"BillingAddress"> | string | null
    city?: StringFilter<"BillingAddress"> | string
    district?: StringFilter<"BillingAddress"> | string
    state?: StringFilter<"BillingAddress"> | string
    stateCode?: StringNullableFilter<"BillingAddress"> | string | null
    country?: StringFilter<"BillingAddress"> | string
    pincode?: StringFilter<"BillingAddress"> | string
    createdAt?: DateTimeFilter<"BillingAddress"> | Date | string
    updatedAt?: DateTimeFilter<"BillingAddress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type BillingAddressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    houseNo?: SortOrder
    line1?: SortOrder
    line2?: SortOrderInput | SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    stateCode?: SortOrderInput | SortOrder
    country?: SortOrder
    pincode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BillingAddressCountOrderByAggregateInput
    _max?: BillingAddressMaxOrderByAggregateInput
    _min?: BillingAddressMinOrderByAggregateInput
  }

  export type BillingAddressScalarWhereWithAggregatesInput = {
    AND?: BillingAddressScalarWhereWithAggregatesInput | BillingAddressScalarWhereWithAggregatesInput[]
    OR?: BillingAddressScalarWhereWithAggregatesInput[]
    NOT?: BillingAddressScalarWhereWithAggregatesInput | BillingAddressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BillingAddress"> | string
    userId?: StringWithAggregatesFilter<"BillingAddress"> | string
    houseNo?: StringWithAggregatesFilter<"BillingAddress"> | string
    line1?: StringWithAggregatesFilter<"BillingAddress"> | string
    line2?: StringNullableWithAggregatesFilter<"BillingAddress"> | string | null
    city?: StringWithAggregatesFilter<"BillingAddress"> | string
    district?: StringWithAggregatesFilter<"BillingAddress"> | string
    state?: StringWithAggregatesFilter<"BillingAddress"> | string
    stateCode?: StringNullableWithAggregatesFilter<"BillingAddress"> | string | null
    country?: StringWithAggregatesFilter<"BillingAddress"> | string
    pincode?: StringWithAggregatesFilter<"BillingAddress"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BillingAddress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BillingAddress"> | Date | string
  }

  export type SupplierWhereInput = {
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    id?: StringFilter<"Supplier"> | string
    type?: StringFilter<"Supplier"> | string
    name?: StringFilter<"Supplier"> | string
    phone?: StringFilter<"Supplier"> | string
    email?: StringFilter<"Supplier"> | string
    gstNumber?: StringNullableFilter<"Supplier"> | string | null
    fssaiLicense?: StringNullableFilter<"Supplier"> | string | null
    houseNo?: StringFilter<"Supplier"> | string
    line1?: StringFilter<"Supplier"> | string
    line2?: StringNullableFilter<"Supplier"> | string | null
    city?: StringFilter<"Supplier"> | string
    district?: StringFilter<"Supplier"> | string
    state?: StringFilter<"Supplier"> | string
    stateCode?: StringNullableFilter<"Supplier"> | string | null
    country?: StringFilter<"Supplier"> | string
    pincode?: StringFilter<"Supplier"> | string
    createdAt?: DateTimeFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeFilter<"Supplier"> | Date | string
    orders?: OrderListRelationFilter
  }

  export type SupplierOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    gstNumber?: SortOrderInput | SortOrder
    fssaiLicense?: SortOrderInput | SortOrder
    houseNo?: SortOrder
    line1?: SortOrder
    line2?: SortOrderInput | SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    stateCode?: SortOrderInput | SortOrder
    country?: SortOrder
    pincode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    orders?: OrderOrderByRelationAggregateInput
    _relevance?: SupplierOrderByRelevanceInput
  }

  export type SupplierWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    type?: StringFilter<"Supplier"> | string
    name?: StringFilter<"Supplier"> | string
    phone?: StringFilter<"Supplier"> | string
    email?: StringFilter<"Supplier"> | string
    gstNumber?: StringNullableFilter<"Supplier"> | string | null
    fssaiLicense?: StringNullableFilter<"Supplier"> | string | null
    houseNo?: StringFilter<"Supplier"> | string
    line1?: StringFilter<"Supplier"> | string
    line2?: StringNullableFilter<"Supplier"> | string | null
    city?: StringFilter<"Supplier"> | string
    district?: StringFilter<"Supplier"> | string
    state?: StringFilter<"Supplier"> | string
    stateCode?: StringNullableFilter<"Supplier"> | string | null
    country?: StringFilter<"Supplier"> | string
    pincode?: StringFilter<"Supplier"> | string
    createdAt?: DateTimeFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeFilter<"Supplier"> | Date | string
    orders?: OrderListRelationFilter
  }, "id">

  export type SupplierOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    gstNumber?: SortOrderInput | SortOrder
    fssaiLicense?: SortOrderInput | SortOrder
    houseNo?: SortOrder
    line1?: SortOrder
    line2?: SortOrderInput | SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    stateCode?: SortOrderInput | SortOrder
    country?: SortOrder
    pincode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SupplierCountOrderByAggregateInput
    _max?: SupplierMaxOrderByAggregateInput
    _min?: SupplierMinOrderByAggregateInput
  }

  export type SupplierScalarWhereWithAggregatesInput = {
    AND?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    OR?: SupplierScalarWhereWithAggregatesInput[]
    NOT?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Supplier"> | string
    type?: StringWithAggregatesFilter<"Supplier"> | string
    name?: StringWithAggregatesFilter<"Supplier"> | string
    phone?: StringWithAggregatesFilter<"Supplier"> | string
    email?: StringWithAggregatesFilter<"Supplier"> | string
    gstNumber?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    fssaiLicense?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    houseNo?: StringWithAggregatesFilter<"Supplier"> | string
    line1?: StringWithAggregatesFilter<"Supplier"> | string
    line2?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    city?: StringWithAggregatesFilter<"Supplier"> | string
    district?: StringWithAggregatesFilter<"Supplier"> | string
    state?: StringWithAggregatesFilter<"Supplier"> | string
    stateCode?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    country?: StringWithAggregatesFilter<"Supplier"> | string
    pincode?: StringWithAggregatesFilter<"Supplier"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Supplier"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Supplier"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartCreateNestedManyWithoutUserInput
    bulkCart?: BulkCartCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    order?: OrderCreateNestedManyWithoutUserInput
    passwordReset?: PasswordResetCreateNestedManyWithoutUserInput
    suspensionReasons?: SuspensionReasonCreateNestedManyWithoutUserInput
    billingAddress?: BillingAddressCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartUncheckedCreateNestedManyWithoutUserInput
    bulkCart?: BulkCartUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    order?: OrderUncheckedCreateNestedManyWithoutUserInput
    passwordReset?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    suspensionReasons?: SuspensionReasonUncheckedCreateNestedManyWithoutUserInput
    billingAddress?: BillingAddressUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUpdateManyWithoutUserNestedInput
    bulkCart?: BulkCartUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    order?: OrderUpdateManyWithoutUserNestedInput
    passwordReset?: PasswordResetUpdateManyWithoutUserNestedInput
    suspensionReasons?: SuspensionReasonUpdateManyWithoutUserNestedInput
    billingAddress?: BillingAddressUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUncheckedUpdateManyWithoutUserNestedInput
    bulkCart?: BulkCartUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    order?: OrderUncheckedUpdateManyWithoutUserNestedInput
    passwordReset?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    suspensionReasons?: SuspensionReasonUncheckedUpdateManyWithoutUserNestedInput
    billingAddress?: BillingAddressUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpVerificationCreateInput = {
    id?: string
    email?: string | null
    token: string
    otp: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OtpVerificationUncheckedCreateInput = {
    id?: string
    email?: string | null
    token: string
    otp: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OtpVerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    token?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpVerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    token?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpVerificationCreateManyInput = {
    id?: string
    email?: string | null
    token: string
    otp: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OtpVerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    token?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpVerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    token?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartCreateInput = {
    id?: string
    productId: string
    quantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCartInput
  }

  export type CartUncheckedCreateInput = {
    id?: string
    userId: string
    productId: string
    quantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCartNestedInput
  }

  export type CartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartCreateManyInput = {
    id?: string
    userId: string
    productId: string
    quantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BulkCartCreateInput = {
    id?: string
    productId: string
    quantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBulkCartInput
  }

  export type BulkCartUncheckedCreateInput = {
    id?: string
    userId: string
    productId: string
    quantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BulkCartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBulkCartNestedInput
  }

  export type BulkCartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BulkCartCreateManyInput = {
    id?: string
    userId: string
    productId: string
    quantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BulkCartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BulkCartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressCreateInput = {
    id?: string
    type: string
    name: string
    phone: string
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAddressesInput
    orders?: OrderCreateNestedManyWithoutShippingAddressInput
  }

  export type AddressUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    name: string
    phone: string
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutShippingAddressInput
  }

  export type AddressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAddressesNestedInput
    orders?: OrderUpdateManyWithoutShippingAddressNestedInput
  }

  export type AddressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutShippingAddressNestedInput
  }

  export type AddressCreateManyInput = {
    id?: string
    userId: string
    type: string
    name: string
    phone: string
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id: string
    orderDate?: Date | string
    status?: $Enums.OrderStatus
    totalAmount: number
    discountAmount?: number | null
    paidAmount?: number | null
    packed?: boolean
    refund?: boolean
    customOrder?: boolean
    r_orderId?: string | null
    r_paymentId?: string | null
    paymentLinkUrl?: string | null
    paymentMethod?: string | null
    paymentBank?: string | null
    paymentVpa?: string | null
    courierId?: number | null
    shippingId?: string | null
    shippingOrderId?: string | null
    shippingAmount?: number | null
    awsCode?: string | null
    shippingInvoiceNumber?: string | null
    shippingCourierName?: string | null
    estimatedDeliveryDate?: string | null
    pickupScheduled?: Date | string | null
    deliveredAt?: Date | string | null
    manifestGenerated?: boolean | null
    InvoiceNumber?: string | null
    invoiceType?: string | null
    invoiceSequenceNumber?: number | null
    deliveryCharge?: number | null
    deliveryPartner?: string | null
    deliveryPartnerName?: string | null
    roundedOffAmount?: number | null
    invoiceAmount?: number | null
    refundId?: string | null
    refundReceipt?: string | null
    refundArn?: string | null
    refundCreatedAt?: Date | string | null
    isDifferentSupplier?: boolean | null
    supplier?: SupplierCreateNestedOneWithoutOrdersInput
    orderItems?: OrderItemCreateNestedManyWithoutOrderInput
    shippingAddress?: AddressCreateNestedOneWithoutOrdersInput
    user: UserCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id: string
    orderBy: string
    orderDate?: Date | string
    status?: $Enums.OrderStatus
    totalAmount: number
    discountAmount?: number | null
    paidAmount?: number | null
    packed?: boolean
    refund?: boolean
    customOrder?: boolean
    r_orderId?: string | null
    r_paymentId?: string | null
    paymentLinkUrl?: string | null
    paymentMethod?: string | null
    paymentBank?: string | null
    paymentVpa?: string | null
    courierId?: number | null
    shippingId?: string | null
    shippingOrderId?: string | null
    shippingAmount?: number | null
    awsCode?: string | null
    shippingInvoiceNumber?: string | null
    shippingCourierName?: string | null
    estimatedDeliveryDate?: string | null
    pickupScheduled?: Date | string | null
    deliveredAt?: Date | string | null
    manifestGenerated?: boolean | null
    InvoiceNumber?: string | null
    invoiceType?: string | null
    invoiceSequenceNumber?: number | null
    deliveryCharge?: number | null
    deliveryPartner?: string | null
    deliveryPartnerName?: string | null
    roundedOffAmount?: number | null
    invoiceAmount?: number | null
    refundId?: string | null
    refundReceipt?: string | null
    refundArn?: string | null
    refundCreatedAt?: Date | string | null
    isDifferentSupplier?: boolean | null
    supplierId?: string | null
    shippingAddressId?: string | null
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    packed?: BoolFieldUpdateOperationsInput | boolean
    refund?: BoolFieldUpdateOperationsInput | boolean
    customOrder?: BoolFieldUpdateOperationsInput | boolean
    r_orderId?: NullableStringFieldUpdateOperationsInput | string | null
    r_paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLinkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentBank?: NullableStringFieldUpdateOperationsInput | string | null
    paymentVpa?: NullableStringFieldUpdateOperationsInput | string | null
    courierId?: NullableIntFieldUpdateOperationsInput | number | null
    shippingId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    awsCode?: NullableStringFieldUpdateOperationsInput | string | null
    shippingInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCourierName?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryDate?: NullableStringFieldUpdateOperationsInput | string | null
    pickupScheduled?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manifestGenerated?: NullableBoolFieldUpdateOperationsInput | boolean | null
    InvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceType?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceSequenceNumber?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryPartner?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPartnerName?: NullableStringFieldUpdateOperationsInput | string | null
    roundedOffAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    invoiceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundId?: NullableStringFieldUpdateOperationsInput | string | null
    refundReceipt?: NullableStringFieldUpdateOperationsInput | string | null
    refundArn?: NullableStringFieldUpdateOperationsInput | string | null
    refundCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDifferentSupplier?: NullableBoolFieldUpdateOperationsInput | boolean | null
    supplier?: SupplierUpdateOneWithoutOrdersNestedInput
    orderItems?: OrderItemUpdateManyWithoutOrderNestedInput
    shippingAddress?: AddressUpdateOneWithoutOrdersNestedInput
    user?: UserUpdateOneRequiredWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderBy?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    packed?: BoolFieldUpdateOperationsInput | boolean
    refund?: BoolFieldUpdateOperationsInput | boolean
    customOrder?: BoolFieldUpdateOperationsInput | boolean
    r_orderId?: NullableStringFieldUpdateOperationsInput | string | null
    r_paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLinkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentBank?: NullableStringFieldUpdateOperationsInput | string | null
    paymentVpa?: NullableStringFieldUpdateOperationsInput | string | null
    courierId?: NullableIntFieldUpdateOperationsInput | number | null
    shippingId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    awsCode?: NullableStringFieldUpdateOperationsInput | string | null
    shippingInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCourierName?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryDate?: NullableStringFieldUpdateOperationsInput | string | null
    pickupScheduled?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manifestGenerated?: NullableBoolFieldUpdateOperationsInput | boolean | null
    InvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceType?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceSequenceNumber?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryPartner?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPartnerName?: NullableStringFieldUpdateOperationsInput | string | null
    roundedOffAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    invoiceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundId?: NullableStringFieldUpdateOperationsInput | string | null
    refundReceipt?: NullableStringFieldUpdateOperationsInput | string | null
    refundArn?: NullableStringFieldUpdateOperationsInput | string | null
    refundCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDifferentSupplier?: NullableBoolFieldUpdateOperationsInput | boolean | null
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    orderItems?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id: string
    orderBy: string
    orderDate?: Date | string
    status?: $Enums.OrderStatus
    totalAmount: number
    discountAmount?: number | null
    paidAmount?: number | null
    packed?: boolean
    refund?: boolean
    customOrder?: boolean
    r_orderId?: string | null
    r_paymentId?: string | null
    paymentLinkUrl?: string | null
    paymentMethod?: string | null
    paymentBank?: string | null
    paymentVpa?: string | null
    courierId?: number | null
    shippingId?: string | null
    shippingOrderId?: string | null
    shippingAmount?: number | null
    awsCode?: string | null
    shippingInvoiceNumber?: string | null
    shippingCourierName?: string | null
    estimatedDeliveryDate?: string | null
    pickupScheduled?: Date | string | null
    deliveredAt?: Date | string | null
    manifestGenerated?: boolean | null
    InvoiceNumber?: string | null
    invoiceType?: string | null
    invoiceSequenceNumber?: number | null
    deliveryCharge?: number | null
    deliveryPartner?: string | null
    deliveryPartnerName?: string | null
    roundedOffAmount?: number | null
    invoiceAmount?: number | null
    refundId?: string | null
    refundReceipt?: string | null
    refundArn?: string | null
    refundCreatedAt?: Date | string | null
    isDifferentSupplier?: boolean | null
    supplierId?: string | null
    shippingAddressId?: string | null
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    packed?: BoolFieldUpdateOperationsInput | boolean
    refund?: BoolFieldUpdateOperationsInput | boolean
    customOrder?: BoolFieldUpdateOperationsInput | boolean
    r_orderId?: NullableStringFieldUpdateOperationsInput | string | null
    r_paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLinkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentBank?: NullableStringFieldUpdateOperationsInput | string | null
    paymentVpa?: NullableStringFieldUpdateOperationsInput | string | null
    courierId?: NullableIntFieldUpdateOperationsInput | number | null
    shippingId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    awsCode?: NullableStringFieldUpdateOperationsInput | string | null
    shippingInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCourierName?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryDate?: NullableStringFieldUpdateOperationsInput | string | null
    pickupScheduled?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manifestGenerated?: NullableBoolFieldUpdateOperationsInput | boolean | null
    InvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceType?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceSequenceNumber?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryPartner?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPartnerName?: NullableStringFieldUpdateOperationsInput | string | null
    roundedOffAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    invoiceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundId?: NullableStringFieldUpdateOperationsInput | string | null
    refundReceipt?: NullableStringFieldUpdateOperationsInput | string | null
    refundArn?: NullableStringFieldUpdateOperationsInput | string | null
    refundCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDifferentSupplier?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderBy?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    packed?: BoolFieldUpdateOperationsInput | boolean
    refund?: BoolFieldUpdateOperationsInput | boolean
    customOrder?: BoolFieldUpdateOperationsInput | boolean
    r_orderId?: NullableStringFieldUpdateOperationsInput | string | null
    r_paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLinkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentBank?: NullableStringFieldUpdateOperationsInput | string | null
    paymentVpa?: NullableStringFieldUpdateOperationsInput | string | null
    courierId?: NullableIntFieldUpdateOperationsInput | number | null
    shippingId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    awsCode?: NullableStringFieldUpdateOperationsInput | string | null
    shippingInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCourierName?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryDate?: NullableStringFieldUpdateOperationsInput | string | null
    pickupScheduled?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manifestGenerated?: NullableBoolFieldUpdateOperationsInput | boolean | null
    InvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceType?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceSequenceNumber?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryPartner?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPartnerName?: NullableStringFieldUpdateOperationsInput | string | null
    roundedOffAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    invoiceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundId?: NullableStringFieldUpdateOperationsInput | string | null
    refundReceipt?: NullableStringFieldUpdateOperationsInput | string | null
    refundArn?: NullableStringFieldUpdateOperationsInput | string | null
    refundCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDifferentSupplier?: NullableBoolFieldUpdateOperationsInput | boolean | null
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemCreateInput = {
    id?: string
    productId: string
    quantity: number
    price: number
    discount?: number
    tax: number
    order: OrderCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: string
    orderId: string
    productId: string
    quantity: number
    price: number
    discount?: number
    tax: number
  }

  export type OrderItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    tax?: IntFieldUpdateOperationsInput | number
    order?: OrderUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    tax?: IntFieldUpdateOperationsInput | number
  }

  export type OrderItemCreateManyInput = {
    id?: string
    orderId: string
    productId: string
    quantity: number
    price: number
    discount?: number
    tax: number
  }

  export type OrderItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    tax?: IntFieldUpdateOperationsInput | number
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    tax?: IntFieldUpdateOperationsInput | number
  }

  export type PasswordResetCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutPasswordResetInput
  }

  export type PasswordResetUncheckedCreateInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPasswordResetNestedInput
  }

  export type PasswordResetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetCreateManyInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateInput = {
    id?: string
    message: string
    createdAt?: Date | string
  }

  export type FeedbackUncheckedCreateInput = {
    id?: string
    message: string
    createdAt?: Date | string
  }

  export type FeedbackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackCreateManyInput = {
    id?: string
    message: string
    createdAt?: Date | string
  }

  export type FeedbackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementCreateInput = {
    id?: string
    title: string
    content: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnnouncementUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnnouncementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementCreateManyInput = {
    id?: string
    title: string
    content: string
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnnouncementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnnouncementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PopupAnnouncementCreateInput = {
    id?: string
    isActive?: boolean
    title: string
    message: string
    startDate?: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PopupAnnouncementUncheckedCreateInput = {
    id?: string
    isActive?: boolean
    title: string
    message: string
    startDate?: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PopupAnnouncementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PopupAnnouncementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PopupAnnouncementCreateManyInput = {
    id?: string
    isActive?: boolean
    title: string
    message: string
    startDate?: Date | string
    endDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PopupAnnouncementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PopupAnnouncementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuspensionReasonCreateInput = {
    id?: string
    reason: string
    suspendedAt?: Date | string
    user: UserCreateNestedOneWithoutSuspensionReasonsInput
  }

  export type SuspensionReasonUncheckedCreateInput = {
    id?: string
    userId: string
    reason: string
    suspendedAt?: Date | string
  }

  export type SuspensionReasonUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    suspendedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSuspensionReasonsNestedInput
  }

  export type SuspensionReasonUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    suspendedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuspensionReasonCreateManyInput = {
    id?: string
    userId: string
    reason: string
    suspendedAt?: Date | string
  }

  export type SuspensionReasonUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    suspendedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuspensionReasonUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    suspendedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillingAddressCreateInput = {
    id?: string
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBillingAddressInput
  }

  export type BillingAddressUncheckedCreateInput = {
    id?: string
    userId: string
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillingAddressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBillingAddressNestedInput
  }

  export type BillingAddressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillingAddressCreateManyInput = {
    id?: string
    userId: string
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillingAddressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillingAddressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierCreateInput = {
    id?: string
    type: string
    name: string
    phone: string
    email: string
    gstNumber?: string | null
    fssaiLicense?: string | null
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUncheckedCreateInput = {
    id?: string
    type: string
    name: string
    phone: string
    email: string
    gstNumber?: string | null
    fssaiLicense?: string | null
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    fssaiLicense?: NullableStringFieldUpdateOperationsInput | string | null
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    fssaiLicense?: NullableStringFieldUpdateOperationsInput | string | null
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierCreateManyInput = {
    id?: string
    type: string
    name: string
    phone: string
    email: string
    gstNumber?: string | null
    fssaiLicense?: string | null
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    fssaiLicense?: NullableStringFieldUpdateOperationsInput | string | null
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    fssaiLicense?: NullableStringFieldUpdateOperationsInput | string | null
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type CartListRelationFilter = {
    every?: CartWhereInput
    some?: CartWhereInput
    none?: CartWhereInput
  }

  export type BulkCartListRelationFilter = {
    every?: BulkCartWhereInput
    some?: BulkCartWhereInput
    none?: BulkCartWhereInput
  }

  export type AddressListRelationFilter = {
    every?: AddressWhereInput
    some?: AddressWhereInput
    none?: AddressWhereInput
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type PasswordResetListRelationFilter = {
    every?: PasswordResetWhereInput
    some?: PasswordResetWhereInput
    none?: PasswordResetWhereInput
  }

  export type SuspensionReasonListRelationFilter = {
    every?: SuspensionReasonWhereInput
    some?: SuspensionReasonWhereInput
    none?: SuspensionReasonWhereInput
  }

  export type BillingAddressNullableScalarRelationFilter = {
    is?: BillingAddressWhereInput | null
    isNot?: BillingAddressWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BulkCartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AddressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PasswordResetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SuspensionReasonOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    suspended?: SortOrder
    suspended_number?: SortOrder
    terminated?: SortOrder
    isBusinessAccount?: SortOrder
    businessName?: SortOrder
    gstNumber?: SortOrder
    hasAdditionalTradeName?: SortOrder
    additionalTradeName?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    suspended_number?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    suspended?: SortOrder
    suspended_number?: SortOrder
    terminated?: SortOrder
    isBusinessAccount?: SortOrder
    businessName?: SortOrder
    gstNumber?: SortOrder
    hasAdditionalTradeName?: SortOrder
    additionalTradeName?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    suspended?: SortOrder
    suspended_number?: SortOrder
    terminated?: SortOrder
    isBusinessAccount?: SortOrder
    businessName?: SortOrder
    gstNumber?: SortOrder
    hasAdditionalTradeName?: SortOrder
    additionalTradeName?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    suspended_number?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type OtpVerificationOrderByRelevanceInput = {
    fields: OtpVerificationOrderByRelevanceFieldEnum | OtpVerificationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OtpVerificationCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OtpVerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OtpVerificationMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    otp?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CartOrderByRelevanceInput = {
    fields: CartOrderByRelevanceFieldEnum | CartOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CartCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type CartMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type BulkCartOrderByRelevanceInput = {
    fields: BulkCartOrderByRelevanceFieldEnum | BulkCartOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BulkCartCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BulkCartAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type BulkCartMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BulkCartMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BulkCartSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type AddressOrderByRelevanceInput = {
    fields: AddressOrderByRelevanceFieldEnum | AddressOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AddressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    houseNo?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    stateCode?: SortOrder
    country?: SortOrder
    pincode?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    houseNo?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    stateCode?: SortOrder
    country?: SortOrder
    pincode?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    houseNo?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    stateCode?: SortOrder
    country?: SortOrder
    pincode?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
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

  export type SupplierNullableScalarRelationFilter = {
    is?: SupplierWhereInput | null
    isNot?: SupplierWhereInput | null
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type AddressNullableScalarRelationFilter = {
    is?: AddressWhereInput | null
    isNot?: AddressWhereInput | null
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelevanceInput = {
    fields: OrderOrderByRelevanceFieldEnum | OrderOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    orderBy?: SortOrder
    orderDate?: SortOrder
    status?: SortOrder
    totalAmount?: SortOrder
    discountAmount?: SortOrder
    paidAmount?: SortOrder
    packed?: SortOrder
    refund?: SortOrder
    customOrder?: SortOrder
    r_orderId?: SortOrder
    r_paymentId?: SortOrder
    paymentLinkUrl?: SortOrder
    paymentMethod?: SortOrder
    paymentBank?: SortOrder
    paymentVpa?: SortOrder
    courierId?: SortOrder
    shippingId?: SortOrder
    shippingOrderId?: SortOrder
    shippingAmount?: SortOrder
    awsCode?: SortOrder
    shippingInvoiceNumber?: SortOrder
    shippingCourierName?: SortOrder
    estimatedDeliveryDate?: SortOrder
    pickupScheduled?: SortOrder
    deliveredAt?: SortOrder
    manifestGenerated?: SortOrder
    InvoiceNumber?: SortOrder
    invoiceType?: SortOrder
    invoiceSequenceNumber?: SortOrder
    deliveryCharge?: SortOrder
    deliveryPartner?: SortOrder
    deliveryPartnerName?: SortOrder
    roundedOffAmount?: SortOrder
    invoiceAmount?: SortOrder
    refundId?: SortOrder
    refundReceipt?: SortOrder
    refundArn?: SortOrder
    refundCreatedAt?: SortOrder
    isDifferentSupplier?: SortOrder
    supplierId?: SortOrder
    shippingAddressId?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    totalAmount?: SortOrder
    discountAmount?: SortOrder
    paidAmount?: SortOrder
    courierId?: SortOrder
    shippingAmount?: SortOrder
    invoiceSequenceNumber?: SortOrder
    deliveryCharge?: SortOrder
    roundedOffAmount?: SortOrder
    invoiceAmount?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    orderBy?: SortOrder
    orderDate?: SortOrder
    status?: SortOrder
    totalAmount?: SortOrder
    discountAmount?: SortOrder
    paidAmount?: SortOrder
    packed?: SortOrder
    refund?: SortOrder
    customOrder?: SortOrder
    r_orderId?: SortOrder
    r_paymentId?: SortOrder
    paymentLinkUrl?: SortOrder
    paymentMethod?: SortOrder
    paymentBank?: SortOrder
    paymentVpa?: SortOrder
    courierId?: SortOrder
    shippingId?: SortOrder
    shippingOrderId?: SortOrder
    shippingAmount?: SortOrder
    awsCode?: SortOrder
    shippingInvoiceNumber?: SortOrder
    shippingCourierName?: SortOrder
    estimatedDeliveryDate?: SortOrder
    pickupScheduled?: SortOrder
    deliveredAt?: SortOrder
    manifestGenerated?: SortOrder
    InvoiceNumber?: SortOrder
    invoiceType?: SortOrder
    invoiceSequenceNumber?: SortOrder
    deliveryCharge?: SortOrder
    deliveryPartner?: SortOrder
    deliveryPartnerName?: SortOrder
    roundedOffAmount?: SortOrder
    invoiceAmount?: SortOrder
    refundId?: SortOrder
    refundReceipt?: SortOrder
    refundArn?: SortOrder
    refundCreatedAt?: SortOrder
    isDifferentSupplier?: SortOrder
    supplierId?: SortOrder
    shippingAddressId?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    orderBy?: SortOrder
    orderDate?: SortOrder
    status?: SortOrder
    totalAmount?: SortOrder
    discountAmount?: SortOrder
    paidAmount?: SortOrder
    packed?: SortOrder
    refund?: SortOrder
    customOrder?: SortOrder
    r_orderId?: SortOrder
    r_paymentId?: SortOrder
    paymentLinkUrl?: SortOrder
    paymentMethod?: SortOrder
    paymentBank?: SortOrder
    paymentVpa?: SortOrder
    courierId?: SortOrder
    shippingId?: SortOrder
    shippingOrderId?: SortOrder
    shippingAmount?: SortOrder
    awsCode?: SortOrder
    shippingInvoiceNumber?: SortOrder
    shippingCourierName?: SortOrder
    estimatedDeliveryDate?: SortOrder
    pickupScheduled?: SortOrder
    deliveredAt?: SortOrder
    manifestGenerated?: SortOrder
    InvoiceNumber?: SortOrder
    invoiceType?: SortOrder
    invoiceSequenceNumber?: SortOrder
    deliveryCharge?: SortOrder
    deliveryPartner?: SortOrder
    deliveryPartnerName?: SortOrder
    roundedOffAmount?: SortOrder
    invoiceAmount?: SortOrder
    refundId?: SortOrder
    refundReceipt?: SortOrder
    refundArn?: SortOrder
    refundCreatedAt?: SortOrder
    isDifferentSupplier?: SortOrder
    supplierId?: SortOrder
    shippingAddressId?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    totalAmount?: SortOrder
    discountAmount?: SortOrder
    paidAmount?: SortOrder
    courierId?: SortOrder
    shippingAmount?: SortOrder
    invoiceSequenceNumber?: SortOrder
    deliveryCharge?: SortOrder
    roundedOffAmount?: SortOrder
    invoiceAmount?: SortOrder
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
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

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type OrderItemOrderByRelevanceInput = {
    fields: OrderItemOrderByRelevanceFieldEnum | OrderItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    discount?: SortOrder
    tax?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
    discount?: SortOrder
    tax?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    discount?: SortOrder
    tax?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    discount?: SortOrder
    tax?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
    discount?: SortOrder
    tax?: SortOrder
  }

  export type PasswordResetOrderByRelevanceInput = {
    fields: PasswordResetOrderByRelevanceFieldEnum | PasswordResetOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PasswordResetCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactOrderByRelevanceInput = {
    fields: ContactOrderByRelevanceFieldEnum | ContactOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ContactCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeedbackOrderByRelevanceInput = {
    fields: FeedbackOrderByRelevanceFieldEnum | FeedbackOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type AnnouncementOrderByRelevanceInput = {
    fields: AnnouncementOrderByRelevanceFieldEnum | AnnouncementOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AnnouncementCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnnouncementMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnnouncementMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PopupAnnouncementOrderByRelevanceInput = {
    fields: PopupAnnouncementOrderByRelevanceFieldEnum | PopupAnnouncementOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PopupAnnouncementCountOrderByAggregateInput = {
    id?: SortOrder
    isActive?: SortOrder
    title?: SortOrder
    message?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PopupAnnouncementMaxOrderByAggregateInput = {
    id?: SortOrder
    isActive?: SortOrder
    title?: SortOrder
    message?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PopupAnnouncementMinOrderByAggregateInput = {
    id?: SortOrder
    isActive?: SortOrder
    title?: SortOrder
    message?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SuspensionReasonOrderByRelevanceInput = {
    fields: SuspensionReasonOrderByRelevanceFieldEnum | SuspensionReasonOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SuspensionReasonCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    reason?: SortOrder
    suspendedAt?: SortOrder
  }

  export type SuspensionReasonMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    reason?: SortOrder
    suspendedAt?: SortOrder
  }

  export type SuspensionReasonMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    reason?: SortOrder
    suspendedAt?: SortOrder
  }

  export type BillingAddressOrderByRelevanceInput = {
    fields: BillingAddressOrderByRelevanceFieldEnum | BillingAddressOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BillingAddressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    houseNo?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    stateCode?: SortOrder
    country?: SortOrder
    pincode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BillingAddressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    houseNo?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    stateCode?: SortOrder
    country?: SortOrder
    pincode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BillingAddressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    houseNo?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    stateCode?: SortOrder
    country?: SortOrder
    pincode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierOrderByRelevanceInput = {
    fields: SupplierOrderByRelevanceFieldEnum | SupplierOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SupplierCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    gstNumber?: SortOrder
    fssaiLicense?: SortOrder
    houseNo?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    stateCode?: SortOrder
    country?: SortOrder
    pincode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    gstNumber?: SortOrder
    fssaiLicense?: SortOrder
    houseNo?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    stateCode?: SortOrder
    country?: SortOrder
    pincode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupplierMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    gstNumber?: SortOrder
    fssaiLicense?: SortOrder
    houseNo?: SortOrder
    line1?: SortOrder
    line2?: SortOrder
    city?: SortOrder
    district?: SortOrder
    state?: SortOrder
    stateCode?: SortOrder
    country?: SortOrder
    pincode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CartCreateNestedManyWithoutUserInput = {
    create?: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput> | CartCreateWithoutUserInput[] | CartUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CartCreateOrConnectWithoutUserInput | CartCreateOrConnectWithoutUserInput[]
    createMany?: CartCreateManyUserInputEnvelope
    connect?: CartWhereUniqueInput | CartWhereUniqueInput[]
  }

  export type BulkCartCreateNestedManyWithoutUserInput = {
    create?: XOR<BulkCartCreateWithoutUserInput, BulkCartUncheckedCreateWithoutUserInput> | BulkCartCreateWithoutUserInput[] | BulkCartUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BulkCartCreateOrConnectWithoutUserInput | BulkCartCreateOrConnectWithoutUserInput[]
    createMany?: BulkCartCreateManyUserInputEnvelope
    connect?: BulkCartWhereUniqueInput | BulkCartWhereUniqueInput[]
  }

  export type AddressCreateNestedManyWithoutUserInput = {
    create?: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput> | AddressCreateWithoutUserInput[] | AddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutUserInput | AddressCreateOrConnectWithoutUserInput[]
    createMany?: AddressCreateManyUserInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type PasswordResetCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput> | PasswordResetCreateWithoutUserInput[] | PasswordResetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutUserInput | PasswordResetCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetCreateManyUserInputEnvelope
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
  }

  export type SuspensionReasonCreateNestedManyWithoutUserInput = {
    create?: XOR<SuspensionReasonCreateWithoutUserInput, SuspensionReasonUncheckedCreateWithoutUserInput> | SuspensionReasonCreateWithoutUserInput[] | SuspensionReasonUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SuspensionReasonCreateOrConnectWithoutUserInput | SuspensionReasonCreateOrConnectWithoutUserInput[]
    createMany?: SuspensionReasonCreateManyUserInputEnvelope
    connect?: SuspensionReasonWhereUniqueInput | SuspensionReasonWhereUniqueInput[]
  }

  export type BillingAddressCreateNestedOneWithoutUserInput = {
    create?: XOR<BillingAddressCreateWithoutUserInput, BillingAddressUncheckedCreateWithoutUserInput>
    connectOrCreate?: BillingAddressCreateOrConnectWithoutUserInput
    connect?: BillingAddressWhereUniqueInput
  }

  export type CartUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput> | CartCreateWithoutUserInput[] | CartUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CartCreateOrConnectWithoutUserInput | CartCreateOrConnectWithoutUserInput[]
    createMany?: CartCreateManyUserInputEnvelope
    connect?: CartWhereUniqueInput | CartWhereUniqueInput[]
  }

  export type BulkCartUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BulkCartCreateWithoutUserInput, BulkCartUncheckedCreateWithoutUserInput> | BulkCartCreateWithoutUserInput[] | BulkCartUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BulkCartCreateOrConnectWithoutUserInput | BulkCartCreateOrConnectWithoutUserInput[]
    createMany?: BulkCartCreateManyUserInputEnvelope
    connect?: BulkCartWhereUniqueInput | BulkCartWhereUniqueInput[]
  }

  export type AddressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput> | AddressCreateWithoutUserInput[] | AddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutUserInput | AddressCreateOrConnectWithoutUserInput[]
    createMany?: AddressCreateManyUserInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type PasswordResetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput> | PasswordResetCreateWithoutUserInput[] | PasswordResetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutUserInput | PasswordResetCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetCreateManyUserInputEnvelope
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
  }

  export type SuspensionReasonUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SuspensionReasonCreateWithoutUserInput, SuspensionReasonUncheckedCreateWithoutUserInput> | SuspensionReasonCreateWithoutUserInput[] | SuspensionReasonUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SuspensionReasonCreateOrConnectWithoutUserInput | SuspensionReasonCreateOrConnectWithoutUserInput[]
    createMany?: SuspensionReasonCreateManyUserInputEnvelope
    connect?: SuspensionReasonWhereUniqueInput | SuspensionReasonWhereUniqueInput[]
  }

  export type BillingAddressUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<BillingAddressCreateWithoutUserInput, BillingAddressUncheckedCreateWithoutUserInput>
    connectOrCreate?: BillingAddressCreateOrConnectWithoutUserInput
    connect?: BillingAddressWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CartUpdateManyWithoutUserNestedInput = {
    create?: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput> | CartCreateWithoutUserInput[] | CartUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CartCreateOrConnectWithoutUserInput | CartCreateOrConnectWithoutUserInput[]
    upsert?: CartUpsertWithWhereUniqueWithoutUserInput | CartUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CartCreateManyUserInputEnvelope
    set?: CartWhereUniqueInput | CartWhereUniqueInput[]
    disconnect?: CartWhereUniqueInput | CartWhereUniqueInput[]
    delete?: CartWhereUniqueInput | CartWhereUniqueInput[]
    connect?: CartWhereUniqueInput | CartWhereUniqueInput[]
    update?: CartUpdateWithWhereUniqueWithoutUserInput | CartUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CartUpdateManyWithWhereWithoutUserInput | CartUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CartScalarWhereInput | CartScalarWhereInput[]
  }

  export type BulkCartUpdateManyWithoutUserNestedInput = {
    create?: XOR<BulkCartCreateWithoutUserInput, BulkCartUncheckedCreateWithoutUserInput> | BulkCartCreateWithoutUserInput[] | BulkCartUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BulkCartCreateOrConnectWithoutUserInput | BulkCartCreateOrConnectWithoutUserInput[]
    upsert?: BulkCartUpsertWithWhereUniqueWithoutUserInput | BulkCartUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BulkCartCreateManyUserInputEnvelope
    set?: BulkCartWhereUniqueInput | BulkCartWhereUniqueInput[]
    disconnect?: BulkCartWhereUniqueInput | BulkCartWhereUniqueInput[]
    delete?: BulkCartWhereUniqueInput | BulkCartWhereUniqueInput[]
    connect?: BulkCartWhereUniqueInput | BulkCartWhereUniqueInput[]
    update?: BulkCartUpdateWithWhereUniqueWithoutUserInput | BulkCartUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BulkCartUpdateManyWithWhereWithoutUserInput | BulkCartUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BulkCartScalarWhereInput | BulkCartScalarWhereInput[]
  }

  export type AddressUpdateManyWithoutUserNestedInput = {
    create?: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput> | AddressCreateWithoutUserInput[] | AddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutUserInput | AddressCreateOrConnectWithoutUserInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutUserInput | AddressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AddressCreateManyUserInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutUserInput | AddressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutUserInput | AddressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type PasswordResetUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput> | PasswordResetCreateWithoutUserInput[] | PasswordResetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutUserInput | PasswordResetCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetUpsertWithWhereUniqueWithoutUserInput | PasswordResetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetCreateManyUserInputEnvelope
    set?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    disconnect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    delete?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    update?: PasswordResetUpdateWithWhereUniqueWithoutUserInput | PasswordResetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetUpdateManyWithWhereWithoutUserInput | PasswordResetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
  }

  export type SuspensionReasonUpdateManyWithoutUserNestedInput = {
    create?: XOR<SuspensionReasonCreateWithoutUserInput, SuspensionReasonUncheckedCreateWithoutUserInput> | SuspensionReasonCreateWithoutUserInput[] | SuspensionReasonUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SuspensionReasonCreateOrConnectWithoutUserInput | SuspensionReasonCreateOrConnectWithoutUserInput[]
    upsert?: SuspensionReasonUpsertWithWhereUniqueWithoutUserInput | SuspensionReasonUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SuspensionReasonCreateManyUserInputEnvelope
    set?: SuspensionReasonWhereUniqueInput | SuspensionReasonWhereUniqueInput[]
    disconnect?: SuspensionReasonWhereUniqueInput | SuspensionReasonWhereUniqueInput[]
    delete?: SuspensionReasonWhereUniqueInput | SuspensionReasonWhereUniqueInput[]
    connect?: SuspensionReasonWhereUniqueInput | SuspensionReasonWhereUniqueInput[]
    update?: SuspensionReasonUpdateWithWhereUniqueWithoutUserInput | SuspensionReasonUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SuspensionReasonUpdateManyWithWhereWithoutUserInput | SuspensionReasonUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SuspensionReasonScalarWhereInput | SuspensionReasonScalarWhereInput[]
  }

  export type BillingAddressUpdateOneWithoutUserNestedInput = {
    create?: XOR<BillingAddressCreateWithoutUserInput, BillingAddressUncheckedCreateWithoutUserInput>
    connectOrCreate?: BillingAddressCreateOrConnectWithoutUserInput
    upsert?: BillingAddressUpsertWithoutUserInput
    disconnect?: BillingAddressWhereInput | boolean
    delete?: BillingAddressWhereInput | boolean
    connect?: BillingAddressWhereUniqueInput
    update?: XOR<XOR<BillingAddressUpdateToOneWithWhereWithoutUserInput, BillingAddressUpdateWithoutUserInput>, BillingAddressUncheckedUpdateWithoutUserInput>
  }

  export type CartUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput> | CartCreateWithoutUserInput[] | CartUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CartCreateOrConnectWithoutUserInput | CartCreateOrConnectWithoutUserInput[]
    upsert?: CartUpsertWithWhereUniqueWithoutUserInput | CartUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CartCreateManyUserInputEnvelope
    set?: CartWhereUniqueInput | CartWhereUniqueInput[]
    disconnect?: CartWhereUniqueInput | CartWhereUniqueInput[]
    delete?: CartWhereUniqueInput | CartWhereUniqueInput[]
    connect?: CartWhereUniqueInput | CartWhereUniqueInput[]
    update?: CartUpdateWithWhereUniqueWithoutUserInput | CartUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CartUpdateManyWithWhereWithoutUserInput | CartUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CartScalarWhereInput | CartScalarWhereInput[]
  }

  export type BulkCartUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BulkCartCreateWithoutUserInput, BulkCartUncheckedCreateWithoutUserInput> | BulkCartCreateWithoutUserInput[] | BulkCartUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BulkCartCreateOrConnectWithoutUserInput | BulkCartCreateOrConnectWithoutUserInput[]
    upsert?: BulkCartUpsertWithWhereUniqueWithoutUserInput | BulkCartUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BulkCartCreateManyUserInputEnvelope
    set?: BulkCartWhereUniqueInput | BulkCartWhereUniqueInput[]
    disconnect?: BulkCartWhereUniqueInput | BulkCartWhereUniqueInput[]
    delete?: BulkCartWhereUniqueInput | BulkCartWhereUniqueInput[]
    connect?: BulkCartWhereUniqueInput | BulkCartWhereUniqueInput[]
    update?: BulkCartUpdateWithWhereUniqueWithoutUserInput | BulkCartUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BulkCartUpdateManyWithWhereWithoutUserInput | BulkCartUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BulkCartScalarWhereInput | BulkCartScalarWhereInput[]
  }

  export type AddressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput> | AddressCreateWithoutUserInput[] | AddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutUserInput | AddressCreateOrConnectWithoutUserInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutUserInput | AddressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AddressCreateManyUserInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutUserInput | AddressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutUserInput | AddressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type PasswordResetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput> | PasswordResetCreateWithoutUserInput[] | PasswordResetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetCreateOrConnectWithoutUserInput | PasswordResetCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetUpsertWithWhereUniqueWithoutUserInput | PasswordResetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetCreateManyUserInputEnvelope
    set?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    disconnect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    delete?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    connect?: PasswordResetWhereUniqueInput | PasswordResetWhereUniqueInput[]
    update?: PasswordResetUpdateWithWhereUniqueWithoutUserInput | PasswordResetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetUpdateManyWithWhereWithoutUserInput | PasswordResetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
  }

  export type SuspensionReasonUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SuspensionReasonCreateWithoutUserInput, SuspensionReasonUncheckedCreateWithoutUserInput> | SuspensionReasonCreateWithoutUserInput[] | SuspensionReasonUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SuspensionReasonCreateOrConnectWithoutUserInput | SuspensionReasonCreateOrConnectWithoutUserInput[]
    upsert?: SuspensionReasonUpsertWithWhereUniqueWithoutUserInput | SuspensionReasonUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SuspensionReasonCreateManyUserInputEnvelope
    set?: SuspensionReasonWhereUniqueInput | SuspensionReasonWhereUniqueInput[]
    disconnect?: SuspensionReasonWhereUniqueInput | SuspensionReasonWhereUniqueInput[]
    delete?: SuspensionReasonWhereUniqueInput | SuspensionReasonWhereUniqueInput[]
    connect?: SuspensionReasonWhereUniqueInput | SuspensionReasonWhereUniqueInput[]
    update?: SuspensionReasonUpdateWithWhereUniqueWithoutUserInput | SuspensionReasonUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SuspensionReasonUpdateManyWithWhereWithoutUserInput | SuspensionReasonUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SuspensionReasonScalarWhereInput | SuspensionReasonScalarWhereInput[]
  }

  export type BillingAddressUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<BillingAddressCreateWithoutUserInput, BillingAddressUncheckedCreateWithoutUserInput>
    connectOrCreate?: BillingAddressCreateOrConnectWithoutUserInput
    upsert?: BillingAddressUpsertWithoutUserInput
    disconnect?: BillingAddressWhereInput | boolean
    delete?: BillingAddressWhereInput | boolean
    connect?: BillingAddressWhereUniqueInput
    update?: XOR<XOR<BillingAddressUpdateToOneWithWhereWithoutUserInput, BillingAddressUpdateWithoutUserInput>, BillingAddressUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutCartInput = {
    create?: XOR<UserCreateWithoutCartInput, UserUncheckedCreateWithoutCartInput>
    connectOrCreate?: UserCreateOrConnectWithoutCartInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCartNestedInput = {
    create?: XOR<UserCreateWithoutCartInput, UserUncheckedCreateWithoutCartInput>
    connectOrCreate?: UserCreateOrConnectWithoutCartInput
    upsert?: UserUpsertWithoutCartInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCartInput, UserUpdateWithoutCartInput>, UserUncheckedUpdateWithoutCartInput>
  }

  export type UserCreateNestedOneWithoutBulkCartInput = {
    create?: XOR<UserCreateWithoutBulkCartInput, UserUncheckedCreateWithoutBulkCartInput>
    connectOrCreate?: UserCreateOrConnectWithoutBulkCartInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBulkCartNestedInput = {
    create?: XOR<UserCreateWithoutBulkCartInput, UserUncheckedCreateWithoutBulkCartInput>
    connectOrCreate?: UserCreateOrConnectWithoutBulkCartInput
    upsert?: UserUpsertWithoutBulkCartInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBulkCartInput, UserUpdateWithoutBulkCartInput>, UserUncheckedUpdateWithoutBulkCartInput>
  }

  export type UserCreateNestedOneWithoutAddressesInput = {
    create?: XOR<UserCreateWithoutAddressesInput, UserUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAddressesInput
    connect?: UserWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutShippingAddressInput = {
    create?: XOR<OrderCreateWithoutShippingAddressInput, OrderUncheckedCreateWithoutShippingAddressInput> | OrderCreateWithoutShippingAddressInput[] | OrderUncheckedCreateWithoutShippingAddressInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutShippingAddressInput | OrderCreateOrConnectWithoutShippingAddressInput[]
    createMany?: OrderCreateManyShippingAddressInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutShippingAddressInput = {
    create?: XOR<OrderCreateWithoutShippingAddressInput, OrderUncheckedCreateWithoutShippingAddressInput> | OrderCreateWithoutShippingAddressInput[] | OrderUncheckedCreateWithoutShippingAddressInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutShippingAddressInput | OrderCreateOrConnectWithoutShippingAddressInput[]
    createMany?: OrderCreateManyShippingAddressInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutAddressesNestedInput = {
    create?: XOR<UserCreateWithoutAddressesInput, UserUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAddressesInput
    upsert?: UserUpsertWithoutAddressesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAddressesInput, UserUpdateWithoutAddressesInput>, UserUncheckedUpdateWithoutAddressesInput>
  }

  export type OrderUpdateManyWithoutShippingAddressNestedInput = {
    create?: XOR<OrderCreateWithoutShippingAddressInput, OrderUncheckedCreateWithoutShippingAddressInput> | OrderCreateWithoutShippingAddressInput[] | OrderUncheckedCreateWithoutShippingAddressInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutShippingAddressInput | OrderCreateOrConnectWithoutShippingAddressInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutShippingAddressInput | OrderUpsertWithWhereUniqueWithoutShippingAddressInput[]
    createMany?: OrderCreateManyShippingAddressInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutShippingAddressInput | OrderUpdateWithWhereUniqueWithoutShippingAddressInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutShippingAddressInput | OrderUpdateManyWithWhereWithoutShippingAddressInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutShippingAddressNestedInput = {
    create?: XOR<OrderCreateWithoutShippingAddressInput, OrderUncheckedCreateWithoutShippingAddressInput> | OrderCreateWithoutShippingAddressInput[] | OrderUncheckedCreateWithoutShippingAddressInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutShippingAddressInput | OrderCreateOrConnectWithoutShippingAddressInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutShippingAddressInput | OrderUpsertWithWhereUniqueWithoutShippingAddressInput[]
    createMany?: OrderCreateManyShippingAddressInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutShippingAddressInput | OrderUpdateWithWhereUniqueWithoutShippingAddressInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutShippingAddressInput | OrderUpdateManyWithWhereWithoutShippingAddressInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type SupplierCreateNestedOneWithoutOrdersInput = {
    create?: XOR<SupplierCreateWithoutOrdersInput, SupplierUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutOrdersInput
    connect?: SupplierWhereUniqueInput
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type AddressCreateNestedOneWithoutOrdersInput = {
    create?: XOR<AddressCreateWithoutOrdersInput, AddressUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: AddressCreateOrConnectWithoutOrdersInput
    connect?: AddressWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOrderInput = {
    create?: XOR<UserCreateWithoutOrderInput, UserUncheckedCreateWithoutOrderInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrderInput
    connect?: UserWhereUniqueInput
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
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

  export type SupplierUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<SupplierCreateWithoutOrdersInput, SupplierUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutOrdersInput
    upsert?: SupplierUpsertWithoutOrdersInput
    disconnect?: SupplierWhereInput | boolean
    delete?: SupplierWhereInput | boolean
    connect?: SupplierWhereUniqueInput
    update?: XOR<XOR<SupplierUpdateToOneWithWhereWithoutOrdersInput, SupplierUpdateWithoutOrdersInput>, SupplierUncheckedUpdateWithoutOrdersInput>
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type AddressUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<AddressCreateWithoutOrdersInput, AddressUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: AddressCreateOrConnectWithoutOrdersInput
    upsert?: AddressUpsertWithoutOrdersInput
    disconnect?: AddressWhereInput | boolean
    delete?: AddressWhereInput | boolean
    connect?: AddressWhereUniqueInput
    update?: XOR<XOR<AddressUpdateToOneWithWhereWithoutOrdersInput, AddressUpdateWithoutOrdersInput>, AddressUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateOneRequiredWithoutOrderNestedInput = {
    create?: XOR<UserCreateWithoutOrderInput, UserUncheckedCreateWithoutOrderInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrderInput
    upsert?: UserUpsertWithoutOrderInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrderInput, UserUpdateWithoutOrderInput>, UserUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<OrderCreateWithoutOrderItemsInput, OrderUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutOrderItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<OrderCreateWithoutOrderItemsInput, OrderUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutOrderItemsInput
    upsert?: OrderUpsertWithoutOrderItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutOrderItemsInput, OrderUpdateWithoutOrderItemsInput>, OrderUncheckedUpdateWithoutOrderItemsInput>
  }

  export type UserCreateNestedOneWithoutPasswordResetInput = {
    create?: XOR<UserCreateWithoutPasswordResetInput, UserUncheckedCreateWithoutPasswordResetInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPasswordResetNestedInput = {
    create?: XOR<UserCreateWithoutPasswordResetInput, UserUncheckedCreateWithoutPasswordResetInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetInput
    upsert?: UserUpsertWithoutPasswordResetInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasswordResetInput, UserUpdateWithoutPasswordResetInput>, UserUncheckedUpdateWithoutPasswordResetInput>
  }

  export type UserCreateNestedOneWithoutSuspensionReasonsInput = {
    create?: XOR<UserCreateWithoutSuspensionReasonsInput, UserUncheckedCreateWithoutSuspensionReasonsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSuspensionReasonsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSuspensionReasonsNestedInput = {
    create?: XOR<UserCreateWithoutSuspensionReasonsInput, UserUncheckedCreateWithoutSuspensionReasonsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSuspensionReasonsInput
    upsert?: UserUpsertWithoutSuspensionReasonsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSuspensionReasonsInput, UserUpdateWithoutSuspensionReasonsInput>, UserUncheckedUpdateWithoutSuspensionReasonsInput>
  }

  export type UserCreateNestedOneWithoutBillingAddressInput = {
    create?: XOR<UserCreateWithoutBillingAddressInput, UserUncheckedCreateWithoutBillingAddressInput>
    connectOrCreate?: UserCreateOrConnectWithoutBillingAddressInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBillingAddressNestedInput = {
    create?: XOR<UserCreateWithoutBillingAddressInput, UserUncheckedCreateWithoutBillingAddressInput>
    connectOrCreate?: UserCreateOrConnectWithoutBillingAddressInput
    upsert?: UserUpsertWithoutBillingAddressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBillingAddressInput, UserUpdateWithoutBillingAddressInput>, UserUncheckedUpdateWithoutBillingAddressInput>
  }

  export type OrderCreateNestedManyWithoutSupplierInput = {
    create?: XOR<OrderCreateWithoutSupplierInput, OrderUncheckedCreateWithoutSupplierInput> | OrderCreateWithoutSupplierInput[] | OrderUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutSupplierInput | OrderCreateOrConnectWithoutSupplierInput[]
    createMany?: OrderCreateManySupplierInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: XOR<OrderCreateWithoutSupplierInput, OrderUncheckedCreateWithoutSupplierInput> | OrderCreateWithoutSupplierInput[] | OrderUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutSupplierInput | OrderCreateOrConnectWithoutSupplierInput[]
    createMany?: OrderCreateManySupplierInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<OrderCreateWithoutSupplierInput, OrderUncheckedCreateWithoutSupplierInput> | OrderCreateWithoutSupplierInput[] | OrderUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutSupplierInput | OrderCreateOrConnectWithoutSupplierInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutSupplierInput | OrderUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: OrderCreateManySupplierInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutSupplierInput | OrderUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutSupplierInput | OrderUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<OrderCreateWithoutSupplierInput, OrderUncheckedCreateWithoutSupplierInput> | OrderCreateWithoutSupplierInput[] | OrderUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutSupplierInput | OrderCreateOrConnectWithoutSupplierInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutSupplierInput | OrderUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: OrderCreateManySupplierInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutSupplierInput | OrderUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutSupplierInput | OrderUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
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

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
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

  export type CartCreateWithoutUserInput = {
    id?: string
    productId: string
    quantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartUncheckedCreateWithoutUserInput = {
    id?: string
    productId: string
    quantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CartCreateOrConnectWithoutUserInput = {
    where: CartWhereUniqueInput
    create: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
  }

  export type CartCreateManyUserInputEnvelope = {
    data: CartCreateManyUserInput | CartCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BulkCartCreateWithoutUserInput = {
    id?: string
    productId: string
    quantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BulkCartUncheckedCreateWithoutUserInput = {
    id?: string
    productId: string
    quantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BulkCartCreateOrConnectWithoutUserInput = {
    where: BulkCartWhereUniqueInput
    create: XOR<BulkCartCreateWithoutUserInput, BulkCartUncheckedCreateWithoutUserInput>
  }

  export type BulkCartCreateManyUserInputEnvelope = {
    data: BulkCartCreateManyUserInput | BulkCartCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AddressCreateWithoutUserInput = {
    id?: string
    type: string
    name: string
    phone: string
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutShippingAddressInput
  }

  export type AddressUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    name: string
    phone: string
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutShippingAddressInput
  }

  export type AddressCreateOrConnectWithoutUserInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput>
  }

  export type AddressCreateManyUserInputEnvelope = {
    data: AddressCreateManyUserInput | AddressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutUserInput = {
    id: string
    orderDate?: Date | string
    status?: $Enums.OrderStatus
    totalAmount: number
    discountAmount?: number | null
    paidAmount?: number | null
    packed?: boolean
    refund?: boolean
    customOrder?: boolean
    r_orderId?: string | null
    r_paymentId?: string | null
    paymentLinkUrl?: string | null
    paymentMethod?: string | null
    paymentBank?: string | null
    paymentVpa?: string | null
    courierId?: number | null
    shippingId?: string | null
    shippingOrderId?: string | null
    shippingAmount?: number | null
    awsCode?: string | null
    shippingInvoiceNumber?: string | null
    shippingCourierName?: string | null
    estimatedDeliveryDate?: string | null
    pickupScheduled?: Date | string | null
    deliveredAt?: Date | string | null
    manifestGenerated?: boolean | null
    InvoiceNumber?: string | null
    invoiceType?: string | null
    invoiceSequenceNumber?: number | null
    deliveryCharge?: number | null
    deliveryPartner?: string | null
    deliveryPartnerName?: string | null
    roundedOffAmount?: number | null
    invoiceAmount?: number | null
    refundId?: string | null
    refundReceipt?: string | null
    refundArn?: string | null
    refundCreatedAt?: Date | string | null
    isDifferentSupplier?: boolean | null
    supplier?: SupplierCreateNestedOneWithoutOrdersInput
    orderItems?: OrderItemCreateNestedManyWithoutOrderInput
    shippingAddress?: AddressCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutUserInput = {
    id: string
    orderDate?: Date | string
    status?: $Enums.OrderStatus
    totalAmount: number
    discountAmount?: number | null
    paidAmount?: number | null
    packed?: boolean
    refund?: boolean
    customOrder?: boolean
    r_orderId?: string | null
    r_paymentId?: string | null
    paymentLinkUrl?: string | null
    paymentMethod?: string | null
    paymentBank?: string | null
    paymentVpa?: string | null
    courierId?: number | null
    shippingId?: string | null
    shippingOrderId?: string | null
    shippingAmount?: number | null
    awsCode?: string | null
    shippingInvoiceNumber?: string | null
    shippingCourierName?: string | null
    estimatedDeliveryDate?: string | null
    pickupScheduled?: Date | string | null
    deliveredAt?: Date | string | null
    manifestGenerated?: boolean | null
    InvoiceNumber?: string | null
    invoiceType?: string | null
    invoiceSequenceNumber?: number | null
    deliveryCharge?: number | null
    deliveryPartner?: string | null
    deliveryPartnerName?: string | null
    roundedOffAmount?: number | null
    invoiceAmount?: number | null
    refundId?: string | null
    refundReceipt?: string | null
    refundArn?: string | null
    refundCreatedAt?: Date | string | null
    isDifferentSupplier?: boolean | null
    supplierId?: string | null
    shippingAddressId?: string | null
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutUserInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderCreateManyUserInputEnvelope = {
    data: OrderCreateManyUserInput | OrderCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PasswordResetCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type PasswordResetCreateOrConnectWithoutUserInput = {
    where: PasswordResetWhereUniqueInput
    create: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetCreateManyUserInputEnvelope = {
    data: PasswordResetCreateManyUserInput | PasswordResetCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SuspensionReasonCreateWithoutUserInput = {
    id?: string
    reason: string
    suspendedAt?: Date | string
  }

  export type SuspensionReasonUncheckedCreateWithoutUserInput = {
    id?: string
    reason: string
    suspendedAt?: Date | string
  }

  export type SuspensionReasonCreateOrConnectWithoutUserInput = {
    where: SuspensionReasonWhereUniqueInput
    create: XOR<SuspensionReasonCreateWithoutUserInput, SuspensionReasonUncheckedCreateWithoutUserInput>
  }

  export type SuspensionReasonCreateManyUserInputEnvelope = {
    data: SuspensionReasonCreateManyUserInput | SuspensionReasonCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BillingAddressCreateWithoutUserInput = {
    id?: string
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillingAddressUncheckedCreateWithoutUserInput = {
    id?: string
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillingAddressCreateOrConnectWithoutUserInput = {
    where: BillingAddressWhereUniqueInput
    create: XOR<BillingAddressCreateWithoutUserInput, BillingAddressUncheckedCreateWithoutUserInput>
  }

  export type CartUpsertWithWhereUniqueWithoutUserInput = {
    where: CartWhereUniqueInput
    update: XOR<CartUpdateWithoutUserInput, CartUncheckedUpdateWithoutUserInput>
    create: XOR<CartCreateWithoutUserInput, CartUncheckedCreateWithoutUserInput>
  }

  export type CartUpdateWithWhereUniqueWithoutUserInput = {
    where: CartWhereUniqueInput
    data: XOR<CartUpdateWithoutUserInput, CartUncheckedUpdateWithoutUserInput>
  }

  export type CartUpdateManyWithWhereWithoutUserInput = {
    where: CartScalarWhereInput
    data: XOR<CartUpdateManyMutationInput, CartUncheckedUpdateManyWithoutUserInput>
  }

  export type CartScalarWhereInput = {
    AND?: CartScalarWhereInput | CartScalarWhereInput[]
    OR?: CartScalarWhereInput[]
    NOT?: CartScalarWhereInput | CartScalarWhereInput[]
    id?: StringFilter<"Cart"> | string
    userId?: StringFilter<"Cart"> | string
    productId?: StringFilter<"Cart"> | string
    quantity?: IntFilter<"Cart"> | number
    createdAt?: DateTimeFilter<"Cart"> | Date | string
    updatedAt?: DateTimeFilter<"Cart"> | Date | string
  }

  export type BulkCartUpsertWithWhereUniqueWithoutUserInput = {
    where: BulkCartWhereUniqueInput
    update: XOR<BulkCartUpdateWithoutUserInput, BulkCartUncheckedUpdateWithoutUserInput>
    create: XOR<BulkCartCreateWithoutUserInput, BulkCartUncheckedCreateWithoutUserInput>
  }

  export type BulkCartUpdateWithWhereUniqueWithoutUserInput = {
    where: BulkCartWhereUniqueInput
    data: XOR<BulkCartUpdateWithoutUserInput, BulkCartUncheckedUpdateWithoutUserInput>
  }

  export type BulkCartUpdateManyWithWhereWithoutUserInput = {
    where: BulkCartScalarWhereInput
    data: XOR<BulkCartUpdateManyMutationInput, BulkCartUncheckedUpdateManyWithoutUserInput>
  }

  export type BulkCartScalarWhereInput = {
    AND?: BulkCartScalarWhereInput | BulkCartScalarWhereInput[]
    OR?: BulkCartScalarWhereInput[]
    NOT?: BulkCartScalarWhereInput | BulkCartScalarWhereInput[]
    id?: StringFilter<"BulkCart"> | string
    userId?: StringFilter<"BulkCart"> | string
    productId?: StringFilter<"BulkCart"> | string
    quantity?: IntFilter<"BulkCart"> | number
    createdAt?: DateTimeFilter<"BulkCart"> | Date | string
    updatedAt?: DateTimeFilter<"BulkCart"> | Date | string
  }

  export type AddressUpsertWithWhereUniqueWithoutUserInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutUserInput, AddressUncheckedUpdateWithoutUserInput>
    create: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutUserInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutUserInput, AddressUncheckedUpdateWithoutUserInput>
  }

  export type AddressUpdateManyWithWhereWithoutUserInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutUserInput>
  }

  export type AddressScalarWhereInput = {
    AND?: AddressScalarWhereInput | AddressScalarWhereInput[]
    OR?: AddressScalarWhereInput[]
    NOT?: AddressScalarWhereInput | AddressScalarWhereInput[]
    id?: StringFilter<"Address"> | string
    userId?: StringFilter<"Address"> | string
    type?: StringFilter<"Address"> | string
    name?: StringFilter<"Address"> | string
    phone?: StringFilter<"Address"> | string
    houseNo?: StringFilter<"Address"> | string
    line1?: StringFilter<"Address"> | string
    line2?: StringNullableFilter<"Address"> | string | null
    city?: StringFilter<"Address"> | string
    district?: StringFilter<"Address"> | string
    state?: StringFilter<"Address"> | string
    stateCode?: StringNullableFilter<"Address"> | string | null
    country?: StringFilter<"Address"> | string
    pincode?: StringFilter<"Address"> | string
    isDefault?: BoolFilter<"Address"> | boolean
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
  }

  export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
  }

  export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutUserInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    orderBy?: StringFilter<"Order"> | string
    orderDate?: DateTimeFilter<"Order"> | Date | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    totalAmount?: FloatFilter<"Order"> | number
    discountAmount?: FloatNullableFilter<"Order"> | number | null
    paidAmount?: FloatNullableFilter<"Order"> | number | null
    packed?: BoolFilter<"Order"> | boolean
    refund?: BoolFilter<"Order"> | boolean
    customOrder?: BoolFilter<"Order"> | boolean
    r_orderId?: StringNullableFilter<"Order"> | string | null
    r_paymentId?: StringNullableFilter<"Order"> | string | null
    paymentLinkUrl?: StringNullableFilter<"Order"> | string | null
    paymentMethod?: StringNullableFilter<"Order"> | string | null
    paymentBank?: StringNullableFilter<"Order"> | string | null
    paymentVpa?: StringNullableFilter<"Order"> | string | null
    courierId?: IntNullableFilter<"Order"> | number | null
    shippingId?: StringNullableFilter<"Order"> | string | null
    shippingOrderId?: StringNullableFilter<"Order"> | string | null
    shippingAmount?: FloatNullableFilter<"Order"> | number | null
    awsCode?: StringNullableFilter<"Order"> | string | null
    shippingInvoiceNumber?: StringNullableFilter<"Order"> | string | null
    shippingCourierName?: StringNullableFilter<"Order"> | string | null
    estimatedDeliveryDate?: StringNullableFilter<"Order"> | string | null
    pickupScheduled?: DateTimeNullableFilter<"Order"> | Date | string | null
    deliveredAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    manifestGenerated?: BoolNullableFilter<"Order"> | boolean | null
    InvoiceNumber?: StringNullableFilter<"Order"> | string | null
    invoiceType?: StringNullableFilter<"Order"> | string | null
    invoiceSequenceNumber?: IntNullableFilter<"Order"> | number | null
    deliveryCharge?: FloatNullableFilter<"Order"> | number | null
    deliveryPartner?: StringNullableFilter<"Order"> | string | null
    deliveryPartnerName?: StringNullableFilter<"Order"> | string | null
    roundedOffAmount?: FloatNullableFilter<"Order"> | number | null
    invoiceAmount?: FloatNullableFilter<"Order"> | number | null
    refundId?: StringNullableFilter<"Order"> | string | null
    refundReceipt?: StringNullableFilter<"Order"> | string | null
    refundArn?: StringNullableFilter<"Order"> | string | null
    refundCreatedAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    isDifferentSupplier?: BoolNullableFilter<"Order"> | boolean | null
    supplierId?: StringNullableFilter<"Order"> | string | null
    shippingAddressId?: StringNullableFilter<"Order"> | string | null
  }

  export type PasswordResetUpsertWithWhereUniqueWithoutUserInput = {
    where: PasswordResetWhereUniqueInput
    update: XOR<PasswordResetUpdateWithoutUserInput, PasswordResetUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordResetCreateWithoutUserInput, PasswordResetUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetUpdateWithWhereUniqueWithoutUserInput = {
    where: PasswordResetWhereUniqueInput
    data: XOR<PasswordResetUpdateWithoutUserInput, PasswordResetUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetUpdateManyWithWhereWithoutUserInput = {
    where: PasswordResetScalarWhereInput
    data: XOR<PasswordResetUpdateManyMutationInput, PasswordResetUncheckedUpdateManyWithoutUserInput>
  }

  export type PasswordResetScalarWhereInput = {
    AND?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
    OR?: PasswordResetScalarWhereInput[]
    NOT?: PasswordResetScalarWhereInput | PasswordResetScalarWhereInput[]
    id?: StringFilter<"PasswordReset"> | string
    token?: StringFilter<"PasswordReset"> | string
    userId?: StringFilter<"PasswordReset"> | string
    expiresAt?: DateTimeFilter<"PasswordReset"> | Date | string
    createdAt?: DateTimeFilter<"PasswordReset"> | Date | string
  }

  export type SuspensionReasonUpsertWithWhereUniqueWithoutUserInput = {
    where: SuspensionReasonWhereUniqueInput
    update: XOR<SuspensionReasonUpdateWithoutUserInput, SuspensionReasonUncheckedUpdateWithoutUserInput>
    create: XOR<SuspensionReasonCreateWithoutUserInput, SuspensionReasonUncheckedCreateWithoutUserInput>
  }

  export type SuspensionReasonUpdateWithWhereUniqueWithoutUserInput = {
    where: SuspensionReasonWhereUniqueInput
    data: XOR<SuspensionReasonUpdateWithoutUserInput, SuspensionReasonUncheckedUpdateWithoutUserInput>
  }

  export type SuspensionReasonUpdateManyWithWhereWithoutUserInput = {
    where: SuspensionReasonScalarWhereInput
    data: XOR<SuspensionReasonUpdateManyMutationInput, SuspensionReasonUncheckedUpdateManyWithoutUserInput>
  }

  export type SuspensionReasonScalarWhereInput = {
    AND?: SuspensionReasonScalarWhereInput | SuspensionReasonScalarWhereInput[]
    OR?: SuspensionReasonScalarWhereInput[]
    NOT?: SuspensionReasonScalarWhereInput | SuspensionReasonScalarWhereInput[]
    id?: StringFilter<"SuspensionReason"> | string
    userId?: StringFilter<"SuspensionReason"> | string
    reason?: StringFilter<"SuspensionReason"> | string
    suspendedAt?: DateTimeFilter<"SuspensionReason"> | Date | string
  }

  export type BillingAddressUpsertWithoutUserInput = {
    update: XOR<BillingAddressUpdateWithoutUserInput, BillingAddressUncheckedUpdateWithoutUserInput>
    create: XOR<BillingAddressCreateWithoutUserInput, BillingAddressUncheckedCreateWithoutUserInput>
    where?: BillingAddressWhereInput
  }

  export type BillingAddressUpdateToOneWithWhereWithoutUserInput = {
    where?: BillingAddressWhereInput
    data: XOR<BillingAddressUpdateWithoutUserInput, BillingAddressUncheckedUpdateWithoutUserInput>
  }

  export type BillingAddressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillingAddressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutCartInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bulkCart?: BulkCartCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    order?: OrderCreateNestedManyWithoutUserInput
    passwordReset?: PasswordResetCreateNestedManyWithoutUserInput
    suspensionReasons?: SuspensionReasonCreateNestedManyWithoutUserInput
    billingAddress?: BillingAddressCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCartInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bulkCart?: BulkCartUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    order?: OrderUncheckedCreateNestedManyWithoutUserInput
    passwordReset?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    suspensionReasons?: SuspensionReasonUncheckedCreateNestedManyWithoutUserInput
    billingAddress?: BillingAddressUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCartInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCartInput, UserUncheckedCreateWithoutCartInput>
  }

  export type UserUpsertWithoutCartInput = {
    update: XOR<UserUpdateWithoutCartInput, UserUncheckedUpdateWithoutCartInput>
    create: XOR<UserCreateWithoutCartInput, UserUncheckedCreateWithoutCartInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCartInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCartInput, UserUncheckedUpdateWithoutCartInput>
  }

  export type UserUpdateWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bulkCart?: BulkCartUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    order?: OrderUpdateManyWithoutUserNestedInput
    passwordReset?: PasswordResetUpdateManyWithoutUserNestedInput
    suspensionReasons?: SuspensionReasonUpdateManyWithoutUserNestedInput
    billingAddress?: BillingAddressUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bulkCart?: BulkCartUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    order?: OrderUncheckedUpdateManyWithoutUserNestedInput
    passwordReset?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    suspensionReasons?: SuspensionReasonUncheckedUpdateManyWithoutUserNestedInput
    billingAddress?: BillingAddressUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutBulkCartInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    order?: OrderCreateNestedManyWithoutUserInput
    passwordReset?: PasswordResetCreateNestedManyWithoutUserInput
    suspensionReasons?: SuspensionReasonCreateNestedManyWithoutUserInput
    billingAddress?: BillingAddressCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBulkCartInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    order?: OrderUncheckedCreateNestedManyWithoutUserInput
    passwordReset?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    suspensionReasons?: SuspensionReasonUncheckedCreateNestedManyWithoutUserInput
    billingAddress?: BillingAddressUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBulkCartInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBulkCartInput, UserUncheckedCreateWithoutBulkCartInput>
  }

  export type UserUpsertWithoutBulkCartInput = {
    update: XOR<UserUpdateWithoutBulkCartInput, UserUncheckedUpdateWithoutBulkCartInput>
    create: XOR<UserCreateWithoutBulkCartInput, UserUncheckedCreateWithoutBulkCartInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBulkCartInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBulkCartInput, UserUncheckedUpdateWithoutBulkCartInput>
  }

  export type UserUpdateWithoutBulkCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    order?: OrderUpdateManyWithoutUserNestedInput
    passwordReset?: PasswordResetUpdateManyWithoutUserNestedInput
    suspensionReasons?: SuspensionReasonUpdateManyWithoutUserNestedInput
    billingAddress?: BillingAddressUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBulkCartInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    order?: OrderUncheckedUpdateManyWithoutUserNestedInput
    passwordReset?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    suspensionReasons?: SuspensionReasonUncheckedUpdateManyWithoutUserNestedInput
    billingAddress?: BillingAddressUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutAddressesInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartCreateNestedManyWithoutUserInput
    bulkCart?: BulkCartCreateNestedManyWithoutUserInput
    order?: OrderCreateNestedManyWithoutUserInput
    passwordReset?: PasswordResetCreateNestedManyWithoutUserInput
    suspensionReasons?: SuspensionReasonCreateNestedManyWithoutUserInput
    billingAddress?: BillingAddressCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAddressesInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartUncheckedCreateNestedManyWithoutUserInput
    bulkCart?: BulkCartUncheckedCreateNestedManyWithoutUserInput
    order?: OrderUncheckedCreateNestedManyWithoutUserInput
    passwordReset?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    suspensionReasons?: SuspensionReasonUncheckedCreateNestedManyWithoutUserInput
    billingAddress?: BillingAddressUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAddressesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAddressesInput, UserUncheckedCreateWithoutAddressesInput>
  }

  export type OrderCreateWithoutShippingAddressInput = {
    id: string
    orderDate?: Date | string
    status?: $Enums.OrderStatus
    totalAmount: number
    discountAmount?: number | null
    paidAmount?: number | null
    packed?: boolean
    refund?: boolean
    customOrder?: boolean
    r_orderId?: string | null
    r_paymentId?: string | null
    paymentLinkUrl?: string | null
    paymentMethod?: string | null
    paymentBank?: string | null
    paymentVpa?: string | null
    courierId?: number | null
    shippingId?: string | null
    shippingOrderId?: string | null
    shippingAmount?: number | null
    awsCode?: string | null
    shippingInvoiceNumber?: string | null
    shippingCourierName?: string | null
    estimatedDeliveryDate?: string | null
    pickupScheduled?: Date | string | null
    deliveredAt?: Date | string | null
    manifestGenerated?: boolean | null
    InvoiceNumber?: string | null
    invoiceType?: string | null
    invoiceSequenceNumber?: number | null
    deliveryCharge?: number | null
    deliveryPartner?: string | null
    deliveryPartnerName?: string | null
    roundedOffAmount?: number | null
    invoiceAmount?: number | null
    refundId?: string | null
    refundReceipt?: string | null
    refundArn?: string | null
    refundCreatedAt?: Date | string | null
    isDifferentSupplier?: boolean | null
    supplier?: SupplierCreateNestedOneWithoutOrdersInput
    orderItems?: OrderItemCreateNestedManyWithoutOrderInput
    user: UserCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutShippingAddressInput = {
    id: string
    orderBy: string
    orderDate?: Date | string
    status?: $Enums.OrderStatus
    totalAmount: number
    discountAmount?: number | null
    paidAmount?: number | null
    packed?: boolean
    refund?: boolean
    customOrder?: boolean
    r_orderId?: string | null
    r_paymentId?: string | null
    paymentLinkUrl?: string | null
    paymentMethod?: string | null
    paymentBank?: string | null
    paymentVpa?: string | null
    courierId?: number | null
    shippingId?: string | null
    shippingOrderId?: string | null
    shippingAmount?: number | null
    awsCode?: string | null
    shippingInvoiceNumber?: string | null
    shippingCourierName?: string | null
    estimatedDeliveryDate?: string | null
    pickupScheduled?: Date | string | null
    deliveredAt?: Date | string | null
    manifestGenerated?: boolean | null
    InvoiceNumber?: string | null
    invoiceType?: string | null
    invoiceSequenceNumber?: number | null
    deliveryCharge?: number | null
    deliveryPartner?: string | null
    deliveryPartnerName?: string | null
    roundedOffAmount?: number | null
    invoiceAmount?: number | null
    refundId?: string | null
    refundReceipt?: string | null
    refundArn?: string | null
    refundCreatedAt?: Date | string | null
    isDifferentSupplier?: boolean | null
    supplierId?: string | null
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutShippingAddressInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutShippingAddressInput, OrderUncheckedCreateWithoutShippingAddressInput>
  }

  export type OrderCreateManyShippingAddressInputEnvelope = {
    data: OrderCreateManyShippingAddressInput | OrderCreateManyShippingAddressInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAddressesInput = {
    update: XOR<UserUpdateWithoutAddressesInput, UserUncheckedUpdateWithoutAddressesInput>
    create: XOR<UserCreateWithoutAddressesInput, UserUncheckedCreateWithoutAddressesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAddressesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAddressesInput, UserUncheckedUpdateWithoutAddressesInput>
  }

  export type UserUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUpdateManyWithoutUserNestedInput
    bulkCart?: BulkCartUpdateManyWithoutUserNestedInput
    order?: OrderUpdateManyWithoutUserNestedInput
    passwordReset?: PasswordResetUpdateManyWithoutUserNestedInput
    suspensionReasons?: SuspensionReasonUpdateManyWithoutUserNestedInput
    billingAddress?: BillingAddressUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUncheckedUpdateManyWithoutUserNestedInput
    bulkCart?: BulkCartUncheckedUpdateManyWithoutUserNestedInput
    order?: OrderUncheckedUpdateManyWithoutUserNestedInput
    passwordReset?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    suspensionReasons?: SuspensionReasonUncheckedUpdateManyWithoutUserNestedInput
    billingAddress?: BillingAddressUncheckedUpdateOneWithoutUserNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutShippingAddressInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutShippingAddressInput, OrderUncheckedUpdateWithoutShippingAddressInput>
    create: XOR<OrderCreateWithoutShippingAddressInput, OrderUncheckedCreateWithoutShippingAddressInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutShippingAddressInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutShippingAddressInput, OrderUncheckedUpdateWithoutShippingAddressInput>
  }

  export type OrderUpdateManyWithWhereWithoutShippingAddressInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutShippingAddressInput>
  }

  export type SupplierCreateWithoutOrdersInput = {
    id?: string
    type: string
    name: string
    phone: string
    email: string
    gstNumber?: string | null
    fssaiLicense?: string | null
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierUncheckedCreateWithoutOrdersInput = {
    id?: string
    type: string
    name: string
    phone: string
    email: string
    gstNumber?: string | null
    fssaiLicense?: string | null
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupplierCreateOrConnectWithoutOrdersInput = {
    where: SupplierWhereUniqueInput
    create: XOR<SupplierCreateWithoutOrdersInput, SupplierUncheckedCreateWithoutOrdersInput>
  }

  export type OrderItemCreateWithoutOrderInput = {
    id?: string
    productId: string
    quantity: number
    price: number
    discount?: number
    tax: number
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: string
    productId: string
    quantity: number
    price: number
    discount?: number
    tax: number
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type AddressCreateWithoutOrdersInput = {
    id?: string
    type: string
    name: string
    phone: string
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAddressesInput
  }

  export type AddressUncheckedCreateWithoutOrdersInput = {
    id?: string
    userId: string
    type: string
    name: string
    phone: string
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressCreateOrConnectWithoutOrdersInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutOrdersInput, AddressUncheckedCreateWithoutOrdersInput>
  }

  export type UserCreateWithoutOrderInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartCreateNestedManyWithoutUserInput
    bulkCart?: BulkCartCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    passwordReset?: PasswordResetCreateNestedManyWithoutUserInput
    suspensionReasons?: SuspensionReasonCreateNestedManyWithoutUserInput
    billingAddress?: BillingAddressCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrderInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartUncheckedCreateNestedManyWithoutUserInput
    bulkCart?: BulkCartUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    passwordReset?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    suspensionReasons?: SuspensionReasonUncheckedCreateNestedManyWithoutUserInput
    billingAddress?: BillingAddressUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrderInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrderInput, UserUncheckedCreateWithoutOrderInput>
  }

  export type SupplierUpsertWithoutOrdersInput = {
    update: XOR<SupplierUpdateWithoutOrdersInput, SupplierUncheckedUpdateWithoutOrdersInput>
    create: XOR<SupplierCreateWithoutOrdersInput, SupplierUncheckedCreateWithoutOrdersInput>
    where?: SupplierWhereInput
  }

  export type SupplierUpdateToOneWithWhereWithoutOrdersInput = {
    where?: SupplierWhereInput
    data: XOR<SupplierUpdateWithoutOrdersInput, SupplierUncheckedUpdateWithoutOrdersInput>
  }

  export type SupplierUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    fssaiLicense?: NullableStringFieldUpdateOperationsInput | string | null
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    fssaiLicense?: NullableStringFieldUpdateOperationsInput | string | null
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    price?: FloatFilter<"OrderItem"> | number
    discount?: FloatFilter<"OrderItem"> | number
    tax?: IntFilter<"OrderItem"> | number
  }

  export type AddressUpsertWithoutOrdersInput = {
    update: XOR<AddressUpdateWithoutOrdersInput, AddressUncheckedUpdateWithoutOrdersInput>
    create: XOR<AddressCreateWithoutOrdersInput, AddressUncheckedCreateWithoutOrdersInput>
    where?: AddressWhereInput
  }

  export type AddressUpdateToOneWithWhereWithoutOrdersInput = {
    where?: AddressWhereInput
    data: XOR<AddressUpdateWithoutOrdersInput, AddressUncheckedUpdateWithoutOrdersInput>
  }

  export type AddressUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutOrderInput = {
    update: XOR<UserUpdateWithoutOrderInput, UserUncheckedUpdateWithoutOrderInput>
    create: XOR<UserCreateWithoutOrderInput, UserUncheckedCreateWithoutOrderInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrderInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrderInput, UserUncheckedUpdateWithoutOrderInput>
  }

  export type UserUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUpdateManyWithoutUserNestedInput
    bulkCart?: BulkCartUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    passwordReset?: PasswordResetUpdateManyWithoutUserNestedInput
    suspensionReasons?: SuspensionReasonUpdateManyWithoutUserNestedInput
    billingAddress?: BillingAddressUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUncheckedUpdateManyWithoutUserNestedInput
    bulkCart?: BulkCartUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    passwordReset?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    suspensionReasons?: SuspensionReasonUncheckedUpdateManyWithoutUserNestedInput
    billingAddress?: BillingAddressUncheckedUpdateOneWithoutUserNestedInput
  }

  export type OrderCreateWithoutOrderItemsInput = {
    id: string
    orderDate?: Date | string
    status?: $Enums.OrderStatus
    totalAmount: number
    discountAmount?: number | null
    paidAmount?: number | null
    packed?: boolean
    refund?: boolean
    customOrder?: boolean
    r_orderId?: string | null
    r_paymentId?: string | null
    paymentLinkUrl?: string | null
    paymentMethod?: string | null
    paymentBank?: string | null
    paymentVpa?: string | null
    courierId?: number | null
    shippingId?: string | null
    shippingOrderId?: string | null
    shippingAmount?: number | null
    awsCode?: string | null
    shippingInvoiceNumber?: string | null
    shippingCourierName?: string | null
    estimatedDeliveryDate?: string | null
    pickupScheduled?: Date | string | null
    deliveredAt?: Date | string | null
    manifestGenerated?: boolean | null
    InvoiceNumber?: string | null
    invoiceType?: string | null
    invoiceSequenceNumber?: number | null
    deliveryCharge?: number | null
    deliveryPartner?: string | null
    deliveryPartnerName?: string | null
    roundedOffAmount?: number | null
    invoiceAmount?: number | null
    refundId?: string | null
    refundReceipt?: string | null
    refundArn?: string | null
    refundCreatedAt?: Date | string | null
    isDifferentSupplier?: boolean | null
    supplier?: SupplierCreateNestedOneWithoutOrdersInput
    shippingAddress?: AddressCreateNestedOneWithoutOrdersInput
    user: UserCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutOrderItemsInput = {
    id: string
    orderBy: string
    orderDate?: Date | string
    status?: $Enums.OrderStatus
    totalAmount: number
    discountAmount?: number | null
    paidAmount?: number | null
    packed?: boolean
    refund?: boolean
    customOrder?: boolean
    r_orderId?: string | null
    r_paymentId?: string | null
    paymentLinkUrl?: string | null
    paymentMethod?: string | null
    paymentBank?: string | null
    paymentVpa?: string | null
    courierId?: number | null
    shippingId?: string | null
    shippingOrderId?: string | null
    shippingAmount?: number | null
    awsCode?: string | null
    shippingInvoiceNumber?: string | null
    shippingCourierName?: string | null
    estimatedDeliveryDate?: string | null
    pickupScheduled?: Date | string | null
    deliveredAt?: Date | string | null
    manifestGenerated?: boolean | null
    InvoiceNumber?: string | null
    invoiceType?: string | null
    invoiceSequenceNumber?: number | null
    deliveryCharge?: number | null
    deliveryPartner?: string | null
    deliveryPartnerName?: string | null
    roundedOffAmount?: number | null
    invoiceAmount?: number | null
    refundId?: string | null
    refundReceipt?: string | null
    refundArn?: string | null
    refundCreatedAt?: Date | string | null
    isDifferentSupplier?: boolean | null
    supplierId?: string | null
    shippingAddressId?: string | null
  }

  export type OrderCreateOrConnectWithoutOrderItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutOrderItemsInput, OrderUncheckedCreateWithoutOrderItemsInput>
  }

  export type OrderUpsertWithoutOrderItemsInput = {
    update: XOR<OrderUpdateWithoutOrderItemsInput, OrderUncheckedUpdateWithoutOrderItemsInput>
    create: XOR<OrderCreateWithoutOrderItemsInput, OrderUncheckedCreateWithoutOrderItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutOrderItemsInput, OrderUncheckedUpdateWithoutOrderItemsInput>
  }

  export type OrderUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    packed?: BoolFieldUpdateOperationsInput | boolean
    refund?: BoolFieldUpdateOperationsInput | boolean
    customOrder?: BoolFieldUpdateOperationsInput | boolean
    r_orderId?: NullableStringFieldUpdateOperationsInput | string | null
    r_paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLinkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentBank?: NullableStringFieldUpdateOperationsInput | string | null
    paymentVpa?: NullableStringFieldUpdateOperationsInput | string | null
    courierId?: NullableIntFieldUpdateOperationsInput | number | null
    shippingId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    awsCode?: NullableStringFieldUpdateOperationsInput | string | null
    shippingInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCourierName?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryDate?: NullableStringFieldUpdateOperationsInput | string | null
    pickupScheduled?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manifestGenerated?: NullableBoolFieldUpdateOperationsInput | boolean | null
    InvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceType?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceSequenceNumber?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryPartner?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPartnerName?: NullableStringFieldUpdateOperationsInput | string | null
    roundedOffAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    invoiceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundId?: NullableStringFieldUpdateOperationsInput | string | null
    refundReceipt?: NullableStringFieldUpdateOperationsInput | string | null
    refundArn?: NullableStringFieldUpdateOperationsInput | string | null
    refundCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDifferentSupplier?: NullableBoolFieldUpdateOperationsInput | boolean | null
    supplier?: SupplierUpdateOneWithoutOrdersNestedInput
    shippingAddress?: AddressUpdateOneWithoutOrdersNestedInput
    user?: UserUpdateOneRequiredWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderBy?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    packed?: BoolFieldUpdateOperationsInput | boolean
    refund?: BoolFieldUpdateOperationsInput | boolean
    customOrder?: BoolFieldUpdateOperationsInput | boolean
    r_orderId?: NullableStringFieldUpdateOperationsInput | string | null
    r_paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLinkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentBank?: NullableStringFieldUpdateOperationsInput | string | null
    paymentVpa?: NullableStringFieldUpdateOperationsInput | string | null
    courierId?: NullableIntFieldUpdateOperationsInput | number | null
    shippingId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    awsCode?: NullableStringFieldUpdateOperationsInput | string | null
    shippingInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCourierName?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryDate?: NullableStringFieldUpdateOperationsInput | string | null
    pickupScheduled?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manifestGenerated?: NullableBoolFieldUpdateOperationsInput | boolean | null
    InvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceType?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceSequenceNumber?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryPartner?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPartnerName?: NullableStringFieldUpdateOperationsInput | string | null
    roundedOffAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    invoiceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundId?: NullableStringFieldUpdateOperationsInput | string | null
    refundReceipt?: NullableStringFieldUpdateOperationsInput | string | null
    refundArn?: NullableStringFieldUpdateOperationsInput | string | null
    refundCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDifferentSupplier?: NullableBoolFieldUpdateOperationsInput | boolean | null
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateWithoutPasswordResetInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartCreateNestedManyWithoutUserInput
    bulkCart?: BulkCartCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    order?: OrderCreateNestedManyWithoutUserInput
    suspensionReasons?: SuspensionReasonCreateNestedManyWithoutUserInput
    billingAddress?: BillingAddressCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPasswordResetInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartUncheckedCreateNestedManyWithoutUserInput
    bulkCart?: BulkCartUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    order?: OrderUncheckedCreateNestedManyWithoutUserInput
    suspensionReasons?: SuspensionReasonUncheckedCreateNestedManyWithoutUserInput
    billingAddress?: BillingAddressUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPasswordResetInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordResetInput, UserUncheckedCreateWithoutPasswordResetInput>
  }

  export type UserUpsertWithoutPasswordResetInput = {
    update: XOR<UserUpdateWithoutPasswordResetInput, UserUncheckedUpdateWithoutPasswordResetInput>
    create: XOR<UserCreateWithoutPasswordResetInput, UserUncheckedCreateWithoutPasswordResetInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasswordResetInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasswordResetInput, UserUncheckedUpdateWithoutPasswordResetInput>
  }

  export type UserUpdateWithoutPasswordResetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUpdateManyWithoutUserNestedInput
    bulkCart?: BulkCartUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    order?: OrderUpdateManyWithoutUserNestedInput
    suspensionReasons?: SuspensionReasonUpdateManyWithoutUserNestedInput
    billingAddress?: BillingAddressUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPasswordResetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUncheckedUpdateManyWithoutUserNestedInput
    bulkCart?: BulkCartUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    order?: OrderUncheckedUpdateManyWithoutUserNestedInput
    suspensionReasons?: SuspensionReasonUncheckedUpdateManyWithoutUserNestedInput
    billingAddress?: BillingAddressUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutSuspensionReasonsInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartCreateNestedManyWithoutUserInput
    bulkCart?: BulkCartCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    order?: OrderCreateNestedManyWithoutUserInput
    passwordReset?: PasswordResetCreateNestedManyWithoutUserInput
    billingAddress?: BillingAddressCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSuspensionReasonsInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartUncheckedCreateNestedManyWithoutUserInput
    bulkCart?: BulkCartUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    order?: OrderUncheckedCreateNestedManyWithoutUserInput
    passwordReset?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    billingAddress?: BillingAddressUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSuspensionReasonsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSuspensionReasonsInput, UserUncheckedCreateWithoutSuspensionReasonsInput>
  }

  export type UserUpsertWithoutSuspensionReasonsInput = {
    update: XOR<UserUpdateWithoutSuspensionReasonsInput, UserUncheckedUpdateWithoutSuspensionReasonsInput>
    create: XOR<UserCreateWithoutSuspensionReasonsInput, UserUncheckedCreateWithoutSuspensionReasonsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSuspensionReasonsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSuspensionReasonsInput, UserUncheckedUpdateWithoutSuspensionReasonsInput>
  }

  export type UserUpdateWithoutSuspensionReasonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUpdateManyWithoutUserNestedInput
    bulkCart?: BulkCartUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    order?: OrderUpdateManyWithoutUserNestedInput
    passwordReset?: PasswordResetUpdateManyWithoutUserNestedInput
    billingAddress?: BillingAddressUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSuspensionReasonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUncheckedUpdateManyWithoutUserNestedInput
    bulkCart?: BulkCartUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    order?: OrderUncheckedUpdateManyWithoutUserNestedInput
    passwordReset?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    billingAddress?: BillingAddressUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutBillingAddressInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartCreateNestedManyWithoutUserInput
    bulkCart?: BulkCartCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    order?: OrderCreateNestedManyWithoutUserInput
    passwordReset?: PasswordResetCreateNestedManyWithoutUserInput
    suspensionReasons?: SuspensionReasonCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBillingAddressInput = {
    id?: string
    name: string
    email: string
    suspended?: boolean
    suspended_number?: number
    terminated?: boolean
    isBusinessAccount?: boolean | null
    businessName?: string | null
    gstNumber?: string | null
    hasAdditionalTradeName?: boolean | null
    additionalTradeName?: string | null
    phone: string
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cart?: CartUncheckedCreateNestedManyWithoutUserInput
    bulkCart?: BulkCartUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    order?: OrderUncheckedCreateNestedManyWithoutUserInput
    passwordReset?: PasswordResetUncheckedCreateNestedManyWithoutUserInput
    suspensionReasons?: SuspensionReasonUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBillingAddressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBillingAddressInput, UserUncheckedCreateWithoutBillingAddressInput>
  }

  export type UserUpsertWithoutBillingAddressInput = {
    update: XOR<UserUpdateWithoutBillingAddressInput, UserUncheckedUpdateWithoutBillingAddressInput>
    create: XOR<UserCreateWithoutBillingAddressInput, UserUncheckedCreateWithoutBillingAddressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBillingAddressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBillingAddressInput, UserUncheckedUpdateWithoutBillingAddressInput>
  }

  export type UserUpdateWithoutBillingAddressInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUpdateManyWithoutUserNestedInput
    bulkCart?: BulkCartUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    order?: OrderUpdateManyWithoutUserNestedInput
    passwordReset?: PasswordResetUpdateManyWithoutUserNestedInput
    suspensionReasons?: SuspensionReasonUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBillingAddressInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    suspended?: BoolFieldUpdateOperationsInput | boolean
    suspended_number?: IntFieldUpdateOperationsInput | number
    terminated?: BoolFieldUpdateOperationsInput | boolean
    isBusinessAccount?: NullableBoolFieldUpdateOperationsInput | boolean | null
    businessName?: NullableStringFieldUpdateOperationsInput | string | null
    gstNumber?: NullableStringFieldUpdateOperationsInput | string | null
    hasAdditionalTradeName?: NullableBoolFieldUpdateOperationsInput | boolean | null
    additionalTradeName?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cart?: CartUncheckedUpdateManyWithoutUserNestedInput
    bulkCart?: BulkCartUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    order?: OrderUncheckedUpdateManyWithoutUserNestedInput
    passwordReset?: PasswordResetUncheckedUpdateManyWithoutUserNestedInput
    suspensionReasons?: SuspensionReasonUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrderCreateWithoutSupplierInput = {
    id: string
    orderDate?: Date | string
    status?: $Enums.OrderStatus
    totalAmount: number
    discountAmount?: number | null
    paidAmount?: number | null
    packed?: boolean
    refund?: boolean
    customOrder?: boolean
    r_orderId?: string | null
    r_paymentId?: string | null
    paymentLinkUrl?: string | null
    paymentMethod?: string | null
    paymentBank?: string | null
    paymentVpa?: string | null
    courierId?: number | null
    shippingId?: string | null
    shippingOrderId?: string | null
    shippingAmount?: number | null
    awsCode?: string | null
    shippingInvoiceNumber?: string | null
    shippingCourierName?: string | null
    estimatedDeliveryDate?: string | null
    pickupScheduled?: Date | string | null
    deliveredAt?: Date | string | null
    manifestGenerated?: boolean | null
    InvoiceNumber?: string | null
    invoiceType?: string | null
    invoiceSequenceNumber?: number | null
    deliveryCharge?: number | null
    deliveryPartner?: string | null
    deliveryPartnerName?: string | null
    roundedOffAmount?: number | null
    invoiceAmount?: number | null
    refundId?: string | null
    refundReceipt?: string | null
    refundArn?: string | null
    refundCreatedAt?: Date | string | null
    isDifferentSupplier?: boolean | null
    orderItems?: OrderItemCreateNestedManyWithoutOrderInput
    shippingAddress?: AddressCreateNestedOneWithoutOrdersInput
    user: UserCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutSupplierInput = {
    id: string
    orderBy: string
    orderDate?: Date | string
    status?: $Enums.OrderStatus
    totalAmount: number
    discountAmount?: number | null
    paidAmount?: number | null
    packed?: boolean
    refund?: boolean
    customOrder?: boolean
    r_orderId?: string | null
    r_paymentId?: string | null
    paymentLinkUrl?: string | null
    paymentMethod?: string | null
    paymentBank?: string | null
    paymentVpa?: string | null
    courierId?: number | null
    shippingId?: string | null
    shippingOrderId?: string | null
    shippingAmount?: number | null
    awsCode?: string | null
    shippingInvoiceNumber?: string | null
    shippingCourierName?: string | null
    estimatedDeliveryDate?: string | null
    pickupScheduled?: Date | string | null
    deliveredAt?: Date | string | null
    manifestGenerated?: boolean | null
    InvoiceNumber?: string | null
    invoiceType?: string | null
    invoiceSequenceNumber?: number | null
    deliveryCharge?: number | null
    deliveryPartner?: string | null
    deliveryPartnerName?: string | null
    roundedOffAmount?: number | null
    invoiceAmount?: number | null
    refundId?: string | null
    refundReceipt?: string | null
    refundArn?: string | null
    refundCreatedAt?: Date | string | null
    isDifferentSupplier?: boolean | null
    shippingAddressId?: string | null
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutSupplierInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutSupplierInput, OrderUncheckedCreateWithoutSupplierInput>
  }

  export type OrderCreateManySupplierInputEnvelope = {
    data: OrderCreateManySupplierInput | OrderCreateManySupplierInput[]
    skipDuplicates?: boolean
  }

  export type OrderUpsertWithWhereUniqueWithoutSupplierInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutSupplierInput, OrderUncheckedUpdateWithoutSupplierInput>
    create: XOR<OrderCreateWithoutSupplierInput, OrderUncheckedCreateWithoutSupplierInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutSupplierInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutSupplierInput, OrderUncheckedUpdateWithoutSupplierInput>
  }

  export type OrderUpdateManyWithWhereWithoutSupplierInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutSupplierInput>
  }

  export type CartCreateManyUserInput = {
    id?: string
    productId: string
    quantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BulkCartCreateManyUserInput = {
    id?: string
    productId: string
    quantity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressCreateManyUserInput = {
    id?: string
    type: string
    name: string
    phone: string
    houseNo: string
    line1: string
    line2?: string | null
    city: string
    district: string
    state: string
    stateCode?: string | null
    country?: string
    pincode: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyUserInput = {
    id: string
    orderDate?: Date | string
    status?: $Enums.OrderStatus
    totalAmount: number
    discountAmount?: number | null
    paidAmount?: number | null
    packed?: boolean
    refund?: boolean
    customOrder?: boolean
    r_orderId?: string | null
    r_paymentId?: string | null
    paymentLinkUrl?: string | null
    paymentMethod?: string | null
    paymentBank?: string | null
    paymentVpa?: string | null
    courierId?: number | null
    shippingId?: string | null
    shippingOrderId?: string | null
    shippingAmount?: number | null
    awsCode?: string | null
    shippingInvoiceNumber?: string | null
    shippingCourierName?: string | null
    estimatedDeliveryDate?: string | null
    pickupScheduled?: Date | string | null
    deliveredAt?: Date | string | null
    manifestGenerated?: boolean | null
    InvoiceNumber?: string | null
    invoiceType?: string | null
    invoiceSequenceNumber?: number | null
    deliveryCharge?: number | null
    deliveryPartner?: string | null
    deliveryPartnerName?: string | null
    roundedOffAmount?: number | null
    invoiceAmount?: number | null
    refundId?: string | null
    refundReceipt?: string | null
    refundArn?: string | null
    refundCreatedAt?: Date | string | null
    isDifferentSupplier?: boolean | null
    supplierId?: string | null
    shippingAddressId?: string | null
  }

  export type PasswordResetCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SuspensionReasonCreateManyUserInput = {
    id?: string
    reason: string
    suspendedAt?: Date | string
  }

  export type CartUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BulkCartUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BulkCartUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BulkCartUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutShippingAddressNestedInput
  }

  export type AddressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutShippingAddressNestedInput
  }

  export type AddressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    houseNo?: StringFieldUpdateOperationsInput | string
    line1?: StringFieldUpdateOperationsInput | string
    line2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    country?: StringFieldUpdateOperationsInput | string
    pincode?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    packed?: BoolFieldUpdateOperationsInput | boolean
    refund?: BoolFieldUpdateOperationsInput | boolean
    customOrder?: BoolFieldUpdateOperationsInput | boolean
    r_orderId?: NullableStringFieldUpdateOperationsInput | string | null
    r_paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLinkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentBank?: NullableStringFieldUpdateOperationsInput | string | null
    paymentVpa?: NullableStringFieldUpdateOperationsInput | string | null
    courierId?: NullableIntFieldUpdateOperationsInput | number | null
    shippingId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    awsCode?: NullableStringFieldUpdateOperationsInput | string | null
    shippingInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCourierName?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryDate?: NullableStringFieldUpdateOperationsInput | string | null
    pickupScheduled?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manifestGenerated?: NullableBoolFieldUpdateOperationsInput | boolean | null
    InvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceType?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceSequenceNumber?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryPartner?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPartnerName?: NullableStringFieldUpdateOperationsInput | string | null
    roundedOffAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    invoiceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundId?: NullableStringFieldUpdateOperationsInput | string | null
    refundReceipt?: NullableStringFieldUpdateOperationsInput | string | null
    refundArn?: NullableStringFieldUpdateOperationsInput | string | null
    refundCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDifferentSupplier?: NullableBoolFieldUpdateOperationsInput | boolean | null
    supplier?: SupplierUpdateOneWithoutOrdersNestedInput
    orderItems?: OrderItemUpdateManyWithoutOrderNestedInput
    shippingAddress?: AddressUpdateOneWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    packed?: BoolFieldUpdateOperationsInput | boolean
    refund?: BoolFieldUpdateOperationsInput | boolean
    customOrder?: BoolFieldUpdateOperationsInput | boolean
    r_orderId?: NullableStringFieldUpdateOperationsInput | string | null
    r_paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLinkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentBank?: NullableStringFieldUpdateOperationsInput | string | null
    paymentVpa?: NullableStringFieldUpdateOperationsInput | string | null
    courierId?: NullableIntFieldUpdateOperationsInput | number | null
    shippingId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    awsCode?: NullableStringFieldUpdateOperationsInput | string | null
    shippingInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCourierName?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryDate?: NullableStringFieldUpdateOperationsInput | string | null
    pickupScheduled?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manifestGenerated?: NullableBoolFieldUpdateOperationsInput | boolean | null
    InvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceType?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceSequenceNumber?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryPartner?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPartnerName?: NullableStringFieldUpdateOperationsInput | string | null
    roundedOffAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    invoiceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundId?: NullableStringFieldUpdateOperationsInput | string | null
    refundReceipt?: NullableStringFieldUpdateOperationsInput | string | null
    refundArn?: NullableStringFieldUpdateOperationsInput | string | null
    refundCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDifferentSupplier?: NullableBoolFieldUpdateOperationsInput | boolean | null
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    orderItems?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    packed?: BoolFieldUpdateOperationsInput | boolean
    refund?: BoolFieldUpdateOperationsInput | boolean
    customOrder?: BoolFieldUpdateOperationsInput | boolean
    r_orderId?: NullableStringFieldUpdateOperationsInput | string | null
    r_paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLinkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentBank?: NullableStringFieldUpdateOperationsInput | string | null
    paymentVpa?: NullableStringFieldUpdateOperationsInput | string | null
    courierId?: NullableIntFieldUpdateOperationsInput | number | null
    shippingId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    awsCode?: NullableStringFieldUpdateOperationsInput | string | null
    shippingInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCourierName?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryDate?: NullableStringFieldUpdateOperationsInput | string | null
    pickupScheduled?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manifestGenerated?: NullableBoolFieldUpdateOperationsInput | boolean | null
    InvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceType?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceSequenceNumber?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryPartner?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPartnerName?: NullableStringFieldUpdateOperationsInput | string | null
    roundedOffAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    invoiceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundId?: NullableStringFieldUpdateOperationsInput | string | null
    refundReceipt?: NullableStringFieldUpdateOperationsInput | string | null
    refundArn?: NullableStringFieldUpdateOperationsInput | string | null
    refundCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDifferentSupplier?: NullableBoolFieldUpdateOperationsInput | boolean | null
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PasswordResetUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuspensionReasonUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    suspendedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuspensionReasonUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    suspendedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuspensionReasonUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    suspendedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyShippingAddressInput = {
    id: string
    orderBy: string
    orderDate?: Date | string
    status?: $Enums.OrderStatus
    totalAmount: number
    discountAmount?: number | null
    paidAmount?: number | null
    packed?: boolean
    refund?: boolean
    customOrder?: boolean
    r_orderId?: string | null
    r_paymentId?: string | null
    paymentLinkUrl?: string | null
    paymentMethod?: string | null
    paymentBank?: string | null
    paymentVpa?: string | null
    courierId?: number | null
    shippingId?: string | null
    shippingOrderId?: string | null
    shippingAmount?: number | null
    awsCode?: string | null
    shippingInvoiceNumber?: string | null
    shippingCourierName?: string | null
    estimatedDeliveryDate?: string | null
    pickupScheduled?: Date | string | null
    deliveredAt?: Date | string | null
    manifestGenerated?: boolean | null
    InvoiceNumber?: string | null
    invoiceType?: string | null
    invoiceSequenceNumber?: number | null
    deliveryCharge?: number | null
    deliveryPartner?: string | null
    deliveryPartnerName?: string | null
    roundedOffAmount?: number | null
    invoiceAmount?: number | null
    refundId?: string | null
    refundReceipt?: string | null
    refundArn?: string | null
    refundCreatedAt?: Date | string | null
    isDifferentSupplier?: boolean | null
    supplierId?: string | null
  }

  export type OrderUpdateWithoutShippingAddressInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    packed?: BoolFieldUpdateOperationsInput | boolean
    refund?: BoolFieldUpdateOperationsInput | boolean
    customOrder?: BoolFieldUpdateOperationsInput | boolean
    r_orderId?: NullableStringFieldUpdateOperationsInput | string | null
    r_paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLinkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentBank?: NullableStringFieldUpdateOperationsInput | string | null
    paymentVpa?: NullableStringFieldUpdateOperationsInput | string | null
    courierId?: NullableIntFieldUpdateOperationsInput | number | null
    shippingId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    awsCode?: NullableStringFieldUpdateOperationsInput | string | null
    shippingInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCourierName?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryDate?: NullableStringFieldUpdateOperationsInput | string | null
    pickupScheduled?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manifestGenerated?: NullableBoolFieldUpdateOperationsInput | boolean | null
    InvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceType?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceSequenceNumber?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryPartner?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPartnerName?: NullableStringFieldUpdateOperationsInput | string | null
    roundedOffAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    invoiceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundId?: NullableStringFieldUpdateOperationsInput | string | null
    refundReceipt?: NullableStringFieldUpdateOperationsInput | string | null
    refundArn?: NullableStringFieldUpdateOperationsInput | string | null
    refundCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDifferentSupplier?: NullableBoolFieldUpdateOperationsInput | boolean | null
    supplier?: SupplierUpdateOneWithoutOrdersNestedInput
    orderItems?: OrderItemUpdateManyWithoutOrderNestedInput
    user?: UserUpdateOneRequiredWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutShippingAddressInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderBy?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    packed?: BoolFieldUpdateOperationsInput | boolean
    refund?: BoolFieldUpdateOperationsInput | boolean
    customOrder?: BoolFieldUpdateOperationsInput | boolean
    r_orderId?: NullableStringFieldUpdateOperationsInput | string | null
    r_paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLinkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentBank?: NullableStringFieldUpdateOperationsInput | string | null
    paymentVpa?: NullableStringFieldUpdateOperationsInput | string | null
    courierId?: NullableIntFieldUpdateOperationsInput | number | null
    shippingId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    awsCode?: NullableStringFieldUpdateOperationsInput | string | null
    shippingInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCourierName?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryDate?: NullableStringFieldUpdateOperationsInput | string | null
    pickupScheduled?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manifestGenerated?: NullableBoolFieldUpdateOperationsInput | boolean | null
    InvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceType?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceSequenceNumber?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryPartner?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPartnerName?: NullableStringFieldUpdateOperationsInput | string | null
    roundedOffAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    invoiceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundId?: NullableStringFieldUpdateOperationsInput | string | null
    refundReceipt?: NullableStringFieldUpdateOperationsInput | string | null
    refundArn?: NullableStringFieldUpdateOperationsInput | string | null
    refundCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDifferentSupplier?: NullableBoolFieldUpdateOperationsInput | boolean | null
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
    orderItems?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutShippingAddressInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderBy?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    packed?: BoolFieldUpdateOperationsInput | boolean
    refund?: BoolFieldUpdateOperationsInput | boolean
    customOrder?: BoolFieldUpdateOperationsInput | boolean
    r_orderId?: NullableStringFieldUpdateOperationsInput | string | null
    r_paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLinkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentBank?: NullableStringFieldUpdateOperationsInput | string | null
    paymentVpa?: NullableStringFieldUpdateOperationsInput | string | null
    courierId?: NullableIntFieldUpdateOperationsInput | number | null
    shippingId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    awsCode?: NullableStringFieldUpdateOperationsInput | string | null
    shippingInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCourierName?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryDate?: NullableStringFieldUpdateOperationsInput | string | null
    pickupScheduled?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manifestGenerated?: NullableBoolFieldUpdateOperationsInput | boolean | null
    InvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceType?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceSequenceNumber?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryPartner?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPartnerName?: NullableStringFieldUpdateOperationsInput | string | null
    roundedOffAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    invoiceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundId?: NullableStringFieldUpdateOperationsInput | string | null
    refundReceipt?: NullableStringFieldUpdateOperationsInput | string | null
    refundArn?: NullableStringFieldUpdateOperationsInput | string | null
    refundCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDifferentSupplier?: NullableBoolFieldUpdateOperationsInput | boolean | null
    supplierId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderItemCreateManyOrderInput = {
    id?: string
    productId: string
    quantity: number
    price: number
    discount?: number
    tax: number
  }

  export type OrderItemUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    tax?: IntFieldUpdateOperationsInput | number
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    tax?: IntFieldUpdateOperationsInput | number
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    tax?: IntFieldUpdateOperationsInput | number
  }

  export type OrderCreateManySupplierInput = {
    id: string
    orderBy: string
    orderDate?: Date | string
    status?: $Enums.OrderStatus
    totalAmount: number
    discountAmount?: number | null
    paidAmount?: number | null
    packed?: boolean
    refund?: boolean
    customOrder?: boolean
    r_orderId?: string | null
    r_paymentId?: string | null
    paymentLinkUrl?: string | null
    paymentMethod?: string | null
    paymentBank?: string | null
    paymentVpa?: string | null
    courierId?: number | null
    shippingId?: string | null
    shippingOrderId?: string | null
    shippingAmount?: number | null
    awsCode?: string | null
    shippingInvoiceNumber?: string | null
    shippingCourierName?: string | null
    estimatedDeliveryDate?: string | null
    pickupScheduled?: Date | string | null
    deliveredAt?: Date | string | null
    manifestGenerated?: boolean | null
    InvoiceNumber?: string | null
    invoiceType?: string | null
    invoiceSequenceNumber?: number | null
    deliveryCharge?: number | null
    deliveryPartner?: string | null
    deliveryPartnerName?: string | null
    roundedOffAmount?: number | null
    invoiceAmount?: number | null
    refundId?: string | null
    refundReceipt?: string | null
    refundArn?: string | null
    refundCreatedAt?: Date | string | null
    isDifferentSupplier?: boolean | null
    shippingAddressId?: string | null
  }

  export type OrderUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    packed?: BoolFieldUpdateOperationsInput | boolean
    refund?: BoolFieldUpdateOperationsInput | boolean
    customOrder?: BoolFieldUpdateOperationsInput | boolean
    r_orderId?: NullableStringFieldUpdateOperationsInput | string | null
    r_paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLinkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentBank?: NullableStringFieldUpdateOperationsInput | string | null
    paymentVpa?: NullableStringFieldUpdateOperationsInput | string | null
    courierId?: NullableIntFieldUpdateOperationsInput | number | null
    shippingId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    awsCode?: NullableStringFieldUpdateOperationsInput | string | null
    shippingInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCourierName?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryDate?: NullableStringFieldUpdateOperationsInput | string | null
    pickupScheduled?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manifestGenerated?: NullableBoolFieldUpdateOperationsInput | boolean | null
    InvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceType?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceSequenceNumber?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryPartner?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPartnerName?: NullableStringFieldUpdateOperationsInput | string | null
    roundedOffAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    invoiceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundId?: NullableStringFieldUpdateOperationsInput | string | null
    refundReceipt?: NullableStringFieldUpdateOperationsInput | string | null
    refundArn?: NullableStringFieldUpdateOperationsInput | string | null
    refundCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDifferentSupplier?: NullableBoolFieldUpdateOperationsInput | boolean | null
    orderItems?: OrderItemUpdateManyWithoutOrderNestedInput
    shippingAddress?: AddressUpdateOneWithoutOrdersNestedInput
    user?: UserUpdateOneRequiredWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderBy?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    packed?: BoolFieldUpdateOperationsInput | boolean
    refund?: BoolFieldUpdateOperationsInput | boolean
    customOrder?: BoolFieldUpdateOperationsInput | boolean
    r_orderId?: NullableStringFieldUpdateOperationsInput | string | null
    r_paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLinkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentBank?: NullableStringFieldUpdateOperationsInput | string | null
    paymentVpa?: NullableStringFieldUpdateOperationsInput | string | null
    courierId?: NullableIntFieldUpdateOperationsInput | number | null
    shippingId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    awsCode?: NullableStringFieldUpdateOperationsInput | string | null
    shippingInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCourierName?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryDate?: NullableStringFieldUpdateOperationsInput | string | null
    pickupScheduled?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manifestGenerated?: NullableBoolFieldUpdateOperationsInput | boolean | null
    InvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceType?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceSequenceNumber?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryPartner?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPartnerName?: NullableStringFieldUpdateOperationsInput | string | null
    roundedOffAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    invoiceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundId?: NullableStringFieldUpdateOperationsInput | string | null
    refundReceipt?: NullableStringFieldUpdateOperationsInput | string | null
    refundArn?: NullableStringFieldUpdateOperationsInput | string | null
    refundCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDifferentSupplier?: NullableBoolFieldUpdateOperationsInput | boolean | null
    shippingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    orderItems?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutSupplierInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderBy?: StringFieldUpdateOperationsInput | string
    orderDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paidAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    packed?: BoolFieldUpdateOperationsInput | boolean
    refund?: BoolFieldUpdateOperationsInput | boolean
    customOrder?: BoolFieldUpdateOperationsInput | boolean
    r_orderId?: NullableStringFieldUpdateOperationsInput | string | null
    r_paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentLinkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentBank?: NullableStringFieldUpdateOperationsInput | string | null
    paymentVpa?: NullableStringFieldUpdateOperationsInput | string | null
    courierId?: NullableIntFieldUpdateOperationsInput | number | null
    shippingId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    shippingAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    awsCode?: NullableStringFieldUpdateOperationsInput | string | null
    shippingInvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCourierName?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDeliveryDate?: NullableStringFieldUpdateOperationsInput | string | null
    pickupScheduled?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    manifestGenerated?: NullableBoolFieldUpdateOperationsInput | boolean | null
    InvoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceType?: NullableStringFieldUpdateOperationsInput | string | null
    invoiceSequenceNumber?: NullableIntFieldUpdateOperationsInput | number | null
    deliveryCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    deliveryPartner?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryPartnerName?: NullableStringFieldUpdateOperationsInput | string | null
    roundedOffAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    invoiceAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    refundId?: NullableStringFieldUpdateOperationsInput | string | null
    refundReceipt?: NullableStringFieldUpdateOperationsInput | string | null
    refundArn?: NullableStringFieldUpdateOperationsInput | string | null
    refundCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isDifferentSupplier?: NullableBoolFieldUpdateOperationsInput | boolean | null
    shippingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
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