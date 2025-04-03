<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BankController;
use App\Http\Controllers\NewSalesController;
use App\Http\Controllers\Auth\RolesController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PermissionGroupController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/master', 'HomeController@index');

// Route::get('/home', function () {
//     return view('home');
// })->middleware(['auth'])->name('home');

Route::get('/home', 'HomeController@index')->middleware(['auth'])->name('home');

require __DIR__ . '/auth.php';

//Subscriber
Route::get('/subscriber-create', 'SubscriberController@create');
Route::post('/subscriber-create', 'SubscriberController@store');
//Store
Route::middleware(['permission:stores.create'])->group(function () {
    Route::get('/store-create', 'StoreController@create')->name('stores.create.view');
    Route::post('/store-create', 'StoreController@store')->name('stores.create');
});

Route::middleware(['permission:stores.list.view'])->group(function () {
    Route::get('/store-list', 'StoreController@listView')->name('stores.list.view');
    Route::get('/store-list-data', 'StoreController@list')->name('stores.list');
});

Route::middleware(['permission:stores.edit'])->group(function () {
    Route::get('/store-edit/{id}', 'StoreController@edit')->name('stores.edit.view');
    Route::put('/store-edit/{id}', 'StoreController@update')->name('stores.edit');
});
// Route::delete('/store-delete/{id}', 'StoreController@destroy')->middleware(['stores.destroy'])->name('stores.destroy');
Route::delete('/store-delete/{id}', 'StoreController@destroy')->middleware(['permission:stores.destroy'])->name('stores.destroy');


//Pos-device
Route::middleware(['permission:pos.create'])->group(function () {
    Route::get('/pos-create', 'PosController@create')->name('pos.create.view');
    Route::post('/pos-create', 'PosController@store')->name('pos.create');
});

Route::middleware(['permission:pos.list.view'])->group(function () {
    Route::get('/pos-list', 'PosController@listView')->name('pos.list.view');
    Route::get('/pos-list-data', 'PosController@list')->name('pos.list');
});

Route::middleware(['permission:pos.edit'])->group(function () {
    Route::get('/pos-edit/{id}', 'PosController@edit')->name('pos.edit.view');
    Route::put('/pos-edit/{id}', 'PosController@update')->name('pos.edit');
});

Route::delete('/pos-delete/{id}', 'PosController@destroy')->middleware(['permission:pos.destroy'])->name('pos.destroy');

//Category

Route::middleware(['permission:category.create'])->group(function () {
    Route::get('/category-create', 'CategoryController@create')->name('category.create.view');
    Route::post('/category-create', 'CategoryController@store')->name('category.create');
});
Route::middleware(['permission:category.list.view'])->group(function () {
    Route::get('/category-list', 'CategoryController@listView')->name('category.list.view');
    Route::get('/category-list-data', 'CategoryController@list')->name('category.list');
    Route::get('/default-category-list', 'CategoryController@defaultListView')->name('category.list.view');
    Route::get('/default-category-list-data', 'CategoryController@defaultList')->name('category.list.view');
});

Route::middleware(['permission:category.edit'])->group(function () {
    Route::get('/category-edit/{id}', 'CategoryController@edit')->name('category.edit.view');
    Route::put('/category-edit/{id}', 'CategoryController@update')->name('category.edit');
});

Route::delete('/category-delete/{id}', 'CategoryController@destroy')->middleware(['permission:categories.destroy'])->name('categories.destroy');

//Subcategory
Route::middleware(['permission:subcategory.create'])->group(function () {
    Route::get('/subcategory-create', 'SubcategoryController@create')->name('subcategory.create.view');
    Route::post('/subcategory-create', 'SubcategoryController@store')->name('subcategory.create');
});

Route::middleware(['permission:subcategory.list.view'])->group(function () {
    Route::get('/subcategory-list', 'SubcategoryController@listView')->name('subcategory.list.view');
    Route::get('/subcategory-list-data', 'SubcategoryController@list')->name('subcategory.list');
    Route::get('/default-subcategory-list', 'SubcategoryController@defaultListView')->name('subcategory.list.view');
    Route::get('/default-subcategory-list-data', 'SubcategoryController@defaultList')->name('subcategory.list');
});

Route::middleware(['permission:subcategory.edit'])->group(function () {
    Route::get('/subcategory-edit/{id}', 'SubcategoryController@edit')->name('subcategory.edit.view');
    Route::put('/subcategory-edit/{id}', 'SubcategoryController@update')->name('subcategory.edit');
});

Route::delete('/subcategory-delete/{id}', 'SubcategoryController@destroy')->middleware(['permission:subcategories.destroy'])->name('subcategories.destroy');

//Supplier
// Route::get('/supplier-create', 'SupplierController@create');
// Route::post('/supplier-create', 'SupplierController@store');
// Route::get('/supplier-list', 'SupplierController@list');
// Route::get('/supplier-edit/{id}', 'SupplierController@edit');
// Route::put('/supplier-edit/{id}', 'SupplierController@update');
// Route::delete('/supplier-delete/{id}', 'SupplierController@destroy')->name('suppliers.destroy');

Route::middleware(['permission:supplier.create'])->group(function () {
    Route::get('/supplier-create', 'SupplierController@create')->name('supplier.create.view');
    Route::post('/supplier-create', 'SupplierController@store')->name('supplier.create');
});

Route::middleware(['permission:supplier.list.view'])->group(function () {
    Route::get('/supplier-list', 'SupplierController@listView')->name('supplier.list.view');
    Route::get('/supplier-list-data', 'SupplierController@list')->name('supplier.list');
});

Route::middleware(['permission:supplier.list.view'])->group(function () {
    Route::get('/supplier-transection', 'SupplierController@transectionView')->name('supplier.transection.view');
    Route::get('/supplier-transection-data', 'SupplierController@transectionData')->name('supplier.transection.data');

    //
    Route::get('/supplier-total-purchase/{id}', 'SupplierController@supplierPurchaseDetails')->name('supplier.purchase.details');
    Route::get('/supplier-total-payment/{head_code}', 'SupplierController@supplierPaymentDetails')->name('supplier.payment.details');

});

Route::middleware(['permission:supplier.list.view'])->group(function () {
    Route::get('/supplier-purchase-report', 'SupplierReportController@purchaseReportView')->name('supplier.purchase.report.view');
    Route::get('/supplier-purchase-report-data/{supplier_id}/{startdate}/{enddate}', 'SupplierReportController@purchaseReportData')->name('supplier.purchase.report.data');
});
Route::middleware(['permission:supplier.list.view'])->group(function () {
    Route::get('/supplier-transection-report', 'SupplierReportController@transectionView')->name('supplier.transection.report.view');
    Route::get('/supplier-transection-report-data/{head_code}/{startdate}/{enddate}', 'SupplierReportController@transectionData')->name('supplier.transection.report.data');

});


Route::middleware(['permission:supplier.edit'])->group(function () {
    Route::get('/supplier-edit/{id}', 'SupplierController@edit')->name('supplier.edit.view');
    Route::put('/supplier-edit/{id}', 'SupplierController@update')->name('supplier.edit');
});

Route::delete('/supplier-delete/{id}', 'SupplierController@destroy')->middleware(['permission:suppliers.destroy'])->name('suppliers.destroy');

//Brand
Route::middleware(['permission:brand.create'])->group(function () {
    Route::get('/brand-create', 'BrandController@create')->name('brand.create.view');
    Route::post('/brand-create', 'BrandController@store')->name('brand.create');
});

Route::middleware(['permission:brand.list.view'])->group(function () {
    Route::get('/brand-list', 'BrandController@listView')->name('brand.list.view');
    Route::get('/brand-list-data', 'BrandController@list')->name('brand.list');
    Route::get('/default-brand-list', 'BrandController@defaultListView')->name('brand.list.view');
    Route::get('/default-brand-list-data', 'BrandController@defaultList')->name('brand.list');
});

Route::middleware(['permission:brand.edit'])->group(function () {
    Route::get('/brand-edit/{id}', 'BrandController@edit')->name('brand.edit.view');
    Route::put('/brand-edit/{id}', 'BrandController@update')->name('brand.edit');
});

Route::delete('/brand-delete/{id}', 'BrandController@destroy')->middleware(['permission:brands.destroy'])->name('brands.destroy');


//Product
Route::middleware(['permission:product.create'])->group(function () {
    Route::get('/product-create', 'ProductController@create')->name('product.create.view');
    Route::post('/product-create', 'ProductController@store')->name('product.create');
});

Route::middleware(['permission:product.edit'])->group(function () {
    Route::get('/product-edit/{id}', 'ProductController@edit')->name('product.edit.view');
    Route::put('/product-edit/{id}', 'ProductController@update')->name('product.edit');
});

Route::middleware(['permission:product.list.view'])->group(function () {
    Route::get('/product-list', 'ProductController@listView')->name('product.list.view');
    Route::post('/product-list-data', 'ProductController@list')->name('product.list');
    Route::get('/default-product-list', 'ProductController@defaultListView')->name('product.list.view');
    Route::post('/default-product-list-data', 'ProductController@defaultList')->name('product.list');
});

Route::delete('/product-delete/{id}', 'ProductController@destroy')->middleware(['permission:products.destroy'])->name('products.destroy');

Route::get('/product-create/{id}', 'ProductController@showSubcategory')->middleware(['permission:product.create.showSubcategory'])->name('product.create.showSubcategory');
Route::get('/product-create-tax/{id}', 'ProductController@isTaxExcluded')->middleware(['permission:product.create.isTaxExcluded'])->name('product.create.isTaxExcluded');
// Route::get('/product-discount/{id}', 'ProductController@showDiscount');

Route::post('/product-image-create', 'ProductController@imageStore')->middleware(['permission:product.image.create'])->name('product.image.create');

Route::get('/product-edit-subcategory/{id}', 'ProductController@showSubcategory')->middleware(['permission:product.edit.subcategory'])->name('product.edit.subcategory');
Route::put('/product-image-update/{id}', 'ProductController@imageUpdate')->middleware(['permission:product.image.edit'])->name('product.image.edit');




//Discount
Route::middleware(['permission:discount.create'])->group(function () {
    Route::get('/discount-create', 'DiscountController@create')->name('discount.create.view');
    Route::post('/discount-create', 'DiscountController@store')->name('discount.create');
});

Route::middleware(['permission:discount.list.view'])->group(function () {
    Route::get('/discount-list', 'DiscountController@listView')->name('discount.list.view');
    Route::get('/discount-list-data', 'DiscountController@list')->name('discount.list');
    Route::get('/discount-listJson', 'DiscountController@listJson')->name('discount.list.json');
});


Route::middleware(['permission:discount.edit'])->group(function () {
    Route::get('/discount-edit/{id}', 'DiscountController@edit')->name('discount.edit.view');
    Route::put('/discount-edit/{id}', 'DiscountController@update')->name('discount.edit');
});

Route::delete('/discount-delete/{id}', 'DiscountController@destroy')->middleware(['permission:discounts.destroy'])->name('discounts.destroy');


//Vat
Route::middleware(['permission:vat.create'])->group(function () {
    Route::get('/vat-create', 'VatController@create')->name('vat.create.view');
    // Route::get('/vat-create/{id}', 'VatController@showSubcategory');
    Route::post('/vat-create', 'VatController@store')->name('vat.create');
});

Route::middleware(['permission:vat.list.view'])->group(function () {
    Route::get('/vat-list', 'VatController@listView')->name('vat.list.view');
    Route::get('/vat-list-data', 'VatController@list')->name('vat.list');
});

Route::middleware(['permission:vat.edit'])->group(function () {
    Route::get('/vat-edit/{id}', 'VatController@edit')->name('vat.edit.view');
    Route::put('/vat-edit/{id}', 'VatController@update')->name('vat.edit');
});

Route::delete('/vat-delete/{id}', 'VatController@destroy')->middleware(['permission:vats.destroy'])->name('vats.destroy');


//Test
// Route::get('/test-json', 'OrderController@test');


//Order
Route::post('/get-order', 'OrderWEBController@store')->middleware(['permission:order.create'])->name('order.create');



Route::middleware(['permission:order.list.view'])->group(function () {
    Route::get('/order-list', 'OrderWEBController@listView')->name('order.list.view');
    Route::post('/order-list-data', 'OrderWEBController@list')->name('order.list');
    Route::get('/order-product-list/{id}', 'OrderWEBController@productListView')->name('order.product.list.view');
    Route::get('/order-product-list-data/{id}', 'OrderWEBController@productList')->name('order.product.list');
});



// Route::get('/order-list', 'OrderController@list');


//ProductImage
//Route::get('/download/{imageName}', 'ProductImageController@image')->middleware(['permission:product.download.image'])->name('product.download.image');

//Employee
// Route::get('/employee-create', 'EmployeeController@create');
// Route::post('/employee-create', 'EmployeeController@store');
// Route::get('/employee-list', 'EmployeeController@list');
// Route::get('/employee-edit/{id}', 'EmployeeController@edit');
// Route::put('/employee-edit/{id}', 'EmployeeController@update');
// Route::delete('/employee-delete/{id}', 'EmployeeController@destroy')->name('employees.destroy');


//Role
// Route::get('/role-create', 'RoleController@create');
// Route::post('/role-create', 'RoleController@store');
// Route::get('/role-list', 'RoleController@list');
// Route::get('/role-edit/{id}', 'RoleController@edit');
// Route::put('/role-edit/{id}', 'RoleController@update');
// Route::delete('/role-delete/{id}', 'RoleController@destroy')->name('roles.destroy');

//Purchase Product
Route::middleware(['permission:purchase.create'])->group(function () {
    Route::get('/purchase-create', 'PurchaseController@create')->name('purchase.create.view');
    Route::post('/purchase-create', 'PurchaseController@store')->name('purchase.create');
});

Route::middleware(['permission:purchase.list.view'])->group(function () {
    Route::get('/purchase-list', 'PurchaseController@listView')->name('purchase.list.view');
    Route::get('/purchase-list-data', 'PurchaseController@list')->name('purchase.list');
    Route::get('/purchase-product-list/{id}', 'PurchaseController@productListView')->name('purchase.product.list.view');
    Route::get('/purchase-product-list-data/{id}', 'PurchaseController@productList')->name('purchase.product.list');

    Route::get('/purchase-product-details/{id}', 'PurchaseController@productDetails')->name('purchase.details');
    Route::post('/purchase-product-receive/{id}', 'PurchaseController@productReceive')->name('purchase.receive');
    Route::get('/purchase-list-data/{startdate}/{enddate}', 'PurchaseController@list')->name('purchase.list');
    Route::get('/purchase_list-listData/{supplier_id}/{startdate}/{enddate}', 'PurchaseController@listData')->name('supplier.transection.report.data');
});

Route::middleware(['permission:purchase.edit'])->group(function () {
    Route::get('/purchase-product-edit/{id}', 'PurchaseController@productEdit')->name('purchase.edit.view');
    Route::put('/purchase-product-edit/{id}', 'PurchaseController@update')->name('purchase.edit');
});




//Menu
// Route::get('/menu-create', 'MenuController@create');
// Route::post('/menu-create', 'MenuController@store');
// Route::get('/menu-list', 'MenuController@list');
// Route::get('/menu-edit/{id}', 'MenuController@edit');
// Route::put('/menu-edit/{id}', 'MenuController@update');
// Route::delete('/menu-delete/{id}', 'MenuController@destroy');


//Client
// Route::post('/client-image', 'ClientImageController@store');
// Route::get('/client-image/{imageName}', 'ClientImageController@image');
// Route::post('/client-create', 'ClientController@store');
// Route::get('/client-list/{id}', 'ClientController@list');

//User Information
// Route::post('/login-data', 'Auth\LoginController@check');

//Due Payment
Route::post('/due-payment', 'DuePaymentWEBController@store');
// Route::get('/due-list', 'DuePaymentController@list');
// Route::get('/due-list/{id}', 'DuePaymentController@dueList');

//Reports
Route::middleware(['permission:sales.report.create'])->group(function () {
    Route::get('/reports', 'ReportController@index')->name('reports.create.view');
    Route::post('/reports', 'ReportController@showReport')->name('reports.create');
});


Route::get('/report', 'ReportController@onLoad')->middleware(['permission:report.view'])->name('report.view');

Route::middleware(['permission:employee.report.create'])->group(function () {
    Route::get('/employee-reports', 'EmployeeReportController@index')->name('employee.reports.create.view');
    Route::post('/employee-reports', 'EmployeeReportController@showReport')->name('employee.reports.create');
});
Route::get('/employee-report', 'EmployeeReportController@onLoad')->middleware(['permission:employee.reports.view'])->name('employee.report.create.view');


Route::middleware(['permission:due.report.create'])->group(function () {
    Route::get('/due-reports', 'DueReportController@indexView')->name('due.reports.create.view');
    Route::get('/due-reports-data', 'DueReportController@index')->name('due.reports.create');
});

Route::get('/due-in-details/{clientId}', 'DueReportController@showDetails')->middleware(['permission:due.report.details.view'])->name('due.reports.details');

Route::middleware(['permission:bank.create'])->group(function () {
    Route::get('/bank-reports', 'BankReportController@index');
    Route::get('/bank-report', 'BankReportController@onSubmit');
    Route::post('/bank-report', 'BankReportController@onLoad');
});

Route::get('/reset-password', 'UserController@resetPassword')->name('reset.password');
Route::put('/reset-password/{id}', 'UserController@updatePassword')->name('reset.password.update');

Route::get('/profile', 'UserController@profile')->name('profile');
Route::put('/update-profile/{id}', 'UserController@updateProfile')->name('profile.update');

Route::middleware(['role:Admin'])->group(function () {

    Route::get('/role-list', [RolesController::class, 'index'])->name('admin.roles');
    Route::get('/create-user', 'Auth\AdminController@regUser')->name('user.create.view');
    Route::post('/create-user', 'Auth\AdminController@storeUser')->name('user.create');
    // Route::get('/role-create', 'Auth\RolesController@create')->name('admin.roles.create.view');
    Route::get('/roles-create', [RolesController::class, 'create'])->name('admin.roles.create.view');
    Route::post('/roles-create', 'Auth\RolesController@store')->name('admin.roles.create');

    Route::get('/role-edit/{id}', 'Auth\RolesController@edit')->name('admin.roles.edit.view');
    Route::put('/role-edit/{id}', 'Auth\RolesController@update')->name('admin.roles.update');
    Route::delete('/role-delete/{id}', 'Auth\RolesController@destroy')->name('admin.roles.destroy');


    //users ---------- //admin permissions
    Route::get('/users-list', 'Auth\AdminController@userList')->name('admin.user.list');
    Route::get('/user-edit/{id}', 'Auth\AdminController@userEdit')->name('admin.user.edit.view');
    Route::put('/user-edit/{id}', 'Auth\AdminController@userUpdate')->name('admin.users.update');
    Route::delete('/user-delete/{id}', 'Auth\AdminController@userDestroy')->name('admin.users.destroy');

    ////permissions


    Route::get('/permission-edit/{id}', [PermissionController::class, 'edit'])->name('permission.edit');
    Route::put('/permission-edit/{id}', [PermissionController::class, 'update'])->name('permission.update');
    Route::delete('/permission-delete/{id}', [PermissionController::class, 'destroy'])->name('permission.destroy');

    //Permission group
    Route::get('/permission-group-list', [PermissionGroupController::class, 'list'])->name('permission.group.list');
    Route::get('/permission-group-list-data', [PermissionGroupController::class, 'listData'])->name('permission.group.list.data');

    Route::get('/permission-group-add', [PermissionGroupController::class, 'create'])->name('permission.group.create');
    Route::post('/permission-group-add', [PermissionGroupController::class, 'store'])->name('permission.group.store');

    Route::get('/permission-group-edit/{id}', [PermissionGroupController::class, 'edit'])->name('permission.group.edit');
    Route::put('/permission-group-edit/{id}', [PermissionGroupController::class, 'update'])->name('permission.group.update');

    Route::delete('/permission-group-delete/{id}', [PermissionGroupController::class, 'destroy'])->name('permission.group.destroy');

    //permission ajax Request
    Route::get('/permission-name-list', [PermissionController::class, 'getPermissionList'])->name('permission.ajax.list');

    Route::get('/permission-list', [PermissionController::class, 'index'])->name('permission.list');
    Route::get('/permission-list-data', [PermissionController::class, 'listData'])->name('permission.list.data');

    Route::get('/permission-create', [PermissionController::class, 'create'])->name('permission.create.view');
    Route::post('/permission-create', [PermissionController::class, 'store'])->name('permission.create');

    Route::get('/subscriber-active', 'SubscriberController@ui_create')->name('subscriber');
    Route::get('/subscriber-actives', 'SubscriberController@show_data');
    Route::get('/subscriber-data/{id}', 'SubscriberController@subscriberData');
    Route::get('/subscriber-activ/{id}', 'SubscriberController@update');
    Route::get('/subscriber-delete/{id}', 'SubscriberController@delete');
});

//new added Permission Create
// Route::get('/permission-list', [PermissionController::class, 'index'])->middleware(['permission:permission.list.view'])->name('permission.list');
// Route::middleware(['role:admin|permission:permission.create'])->group(function () {
//     Route::get('/permission-create', [PermissionController::class, 'create'])->name('permission.create.view');
//     Route::post('/permission-create', [PermissionController::class, 'store'])->name('permission.create');
// });

// Route::get('/role-list', [RolesController::class, 'index'])->name('admin.roles');
// Route::get('/create-user', 'Auth\AdminController@regUser')->name('user.create.view');
// Route::post('/create-user', 'Auth\AdminController@storeUser')->name('user.create');
// // Route::get('/role-create', 'Auth\RolesController@create')->name('admin.roles.create.view');
// Route::get('/roles-create', [RolesController::class, 'create'])->name('admin.roles.create.view');
// Route::post('/role-create', 'Auth\RolesController@store')->name('admin.roles.create');

// Route::get('/role-edit/{id}', 'Auth\RolesController@edit')->name('admin.roles.edit.view');
// Route::put('/role-edit/{id}', 'Auth\RolesController@update')->name('admin.roles.update');
// Route::delete('/role-delete/{id}', 'Auth\RolesController@destroy')->name('admin.roles.destroy');


// //users
// Route::get('/users-list', 'Auth\AdminController@userList')->name('admin.user.list');
// Route::get('/user-edit/{id}', 'Auth\AdminController@userEdit')->name('admin.user.edit.view');
// Route::put('/user-edit/{id}', 'Auth\AdminController@userUpdate')->name('admin.users.update');
// Route::delete('/user-delete/{id}', 'Auth\AdminController@userDestroy')->name('admin.users.destroy');



//Customer
Route::middleware(['permission:customer.create'])->group(function () {
    Route::get('/customer-create', 'ClientController@create')->name('customer.create.view');
    Route::post('/customer-create', 'ClientController@store')->name('customer.create');
});

Route::middleware(['permission:customer.list.view'])->group(function () {
    Route::get('/customer-list', 'ClientController@listView')->name('customer.list.view');
    Route::get('/customer-details/{id}', 'ClientController@details')->name('customer.details');
    Route::get('/customer-list-data', 'ClientController@list')->name('customer.list');
});

Route::middleware(['permission:customer.edit'])->group(function () {
    Route::get('/customer-edit/{id}', 'ClientController@edit')->name('customer.edit.view');
    Route::put('/customer-edit/{id}', 'ClientController@update')->name('customer.edit');
});

Route::delete('/customer-delete/{id}', 'ClientController@destroy')->middleware(['permission:customers.destroy'])->name('customers.destroy');

//POS
Route::middleware(['permission:pos.login.create'])->group(function () {
    Route::get('/pos-login', 'PosCartController@posLoginView')->name('pos.login.view');
    Route::post('/pos-login', 'PosCartController@posLogin')->name('pos.pos-login');
});


Route::middleware(['permission:pos.index.view'])->group(function () {
    Route::get('/pos', 'PosCartController@index')->name('pos.index')->name('pos.view');
    Route::post('/pos-logout', 'PosCartController@posLogout')->name('pos.pos-logout');
    Route::get('/product-search/{keyword}', 'PosCartController@search')->name('pos.product.search');
    Route::get('/product-categories', 'PosCartController@categories')->name('pos.product.categories');

    Route::post('pagination/fetch', 'PosCartController@fetch')->name('pagination.fetch');
    Route::post('pagination/search/{keyword}/fetch', 'PosCartController@fetchSearch')->name('pagination.fetch.search');
    Route::post('pagination/categorysearch/{id}/fetch', 'PosCartController@fetchCategorySearch')->name('pagination.fetch.search');

    Route::get('/category-search/{id}', 'PosCartController@searchCategories')->name('pos.category-search');
    Route::get('/product-add/{id}', 'PosCartController@productAdd')->name('pos.product-add');
    Route::get('/customer-search/{id}', 'PosCartController@customerSearch')->name('pos.customer-search');
    Route::get('/discount-search/{id}', 'PosCartController@discountSearch')->name('pos.discount-search');
    Route::get('/tax-search/{id}', 'PosCartController@taxSearch')->name('pos.tax-search');
    Route::get('/pos-search/{id}', 'PosCartController@posSearch')->name('pos.pos-search');

    //HoldSale
    Route::post('/hold-sale-create', 'HoldSaleController@store')->name('hold-sale.create');
    Route::get('/hold-list-data', 'HoldSaleController@list')->name('hold-list.data');
    Route::get('/hold-data/{referenceId}', 'HoldSaleController@edit')->name('hold.edit');
    Route::delete('/hold-data-delete/{referenceId}', 'HoldSaleController@delete')->name('hold.destroy');
});






//product-in
Route::middleware(['permission:product.in.create'])->group(function () {
    Route::get('/product-in', 'ProductInController@index')->name('product.in.view');
    Route::post('/product-in', 'ProductInController@productIn')->name('product.in');
});
Route::get('/product-wise-batch/{productId}/{storeId}', 'ProductTransferController@storeWiseData')->name('product-wise-batch.data');

//product-transfer
Route::middleware(['permission:product.transfer.create'])->group(function () {
    Route::get('/product-transfer', 'ProductTransferController@index')->name('product.transfer.create');
    Route::post('/product-transfer', 'ProductTransferController@productTransfer')->name('product.transfer.store');
});
Route::get('/product-transfer/{from}/{to}', 'ProductTransferController@transferallproducts')->name('product.transfer.store');
Route::get('/product-transfer/{to}', 'ProductTransferController@transferallfrominventory')->name('product.transfer.store');


//product in report
Route::middleware(['permission:product.in.report.create'])->group(function () {
    Route::get('/product-in-reports', 'ProductInReportController@index')->name('product.in.reports.view');
    Route::get('/product-in-report', 'ProductInReportController@onLoad')->name('product.in.report.view');
    Route::post('/product-in-reports', 'ProductInReportController@reports')->name('product.in.reports');
    Route::get('/product-in-details/{storeId}/{productId}', 'ProductInReportDetailsController@index')->name('product.in.reports.details');
});

//profit calculation report
Route::middleware(['permission:product.in.report.create'])->group(function () {
    Route::get('/profit-calculation-reports', 'ProfitCalculationController@index')->name('profit.calculation.reports.view');
    Route::get('/profit-calculation-reports-data/{storeId}', 'ProfitCalculationController@data')->name('profit.calculation.reports.view');
    Route::post('/profit-calculation-reports-data', 'ProfitCalculationController@loadData')->name('profit.calculation.reports.view');
});

// Route::get('/product-in-details/{storeId}/{productId}', 'ProductInReportDetailsController@index')->middleware(['permission:product.in.report.details.view'])->name('product.in.reports.details');

//dashboard-report
// Route::middleware(['permission:product.in.report.create'])->group(function () {
//     Route::get('/product-in-reports', 'ProductInReportController@index')->middleware(['permission:product.in.reports.view'])->name('product.in.reports.view');
//     Route::get('/product-in-report', 'ProductInReportController@onLoad')->middleware(['permission:product.in.report.view'])->name('product.in.report.view');
//     Route::post('/product-in-reports', 'ProductInReportController@reports')->middleware(['permission:product.in.reports'])->name('product.in.reports');
// });

// Route::middleware(['permission:product.in.report.create'])->group(function () {
//     Route::get('/product-in-reports', 'ProductInReportController@index')->middleware(['permission:product.in.reports.view'])->name('product.in.reports.view');
//     Route::get('/product-in-report', 'ProductInReportController@onLoad')->middleware(['permission:product.in.report.view'])->name('product.in.report.view');
//     Route::post('/product-in-reports', 'ProductInReportController@reports')->middleware(['permission:product.in.reports'])->name('product.in.reports');
// });

Route::middleware(['permission:dashboard.view'])->group(function () {
    Route::get('/dashboard-report', 'DashboardReportController@showDashboard')->middleware(['permission:dashboard.view'])->name('dashboard');
    Route::get('/dashboard-store-sale', 'DashboardReportController@storeSale')->name('dashboard.storeSale');

    Route::get('/dashboard-report-seller/{storeId}', 'DashboardReportController@storeSeller')->name('dashboard.storeSeller');
});




//batch
Route::middleware(['permission:batch.create'])->group(function () {
    Route::get('/batch-create', 'BatchController@create')->name('batch.create.view');
    Route::post('/batch-create', 'BatchController@store')->name('batch.create');
});

Route::middleware(['permission:batch.list.view'])->group(function () {
    Route::get('/batch-list', 'BatchController@listView')->name('batch.list.view');
    Route::get('/batch-list-data', 'BatchController@list')->name('batch.list');
});

Route::middleware(['permission:batch.edit'])->group(function () {
    Route::get('/batch-edit/{id}', 'BatchController@edit')->name('batch.edit.view');
    Route::put('/batch-edit/{id}', 'BatchController@update')->name('batch.edit');
});

Route::delete('/batch-delete/{id}', 'BatchController@destroy')->middleware(['permission:batches.destroy'])->name('batches.destroy');

//leaf
Route::middleware(['permission:leaf.create'])->group(function () {
    Route::get('/leaf-create', 'LeafController@create')->name('leaf.create.view');
    Route::post('/leaf-create', 'LeafController@store')->name('leaf.create');
});

Route::middleware(['permission:leaf.list.view'])->group(function () {
    Route::get('/leaf-list', 'LeafController@listView')->name('leaf.list.view');
    Route::get('/leaf-list-data', 'LeafController@list')->name('leaf.list');
});

Route::middleware(['permission:leaf.edit'])->group(function () {
    Route::get('/leaf-edit/{id}', 'LeafController@edit')->name('leaf.edit.view');
    Route::put('/leaf-edit/{id}', 'LeafController@update')->name('leaf.edit');;
});

Route::delete('/leaf-delete/{id}', 'LeafController@destroy')->middleware(['permission:leaf.list.destroy'])->name('leaf.list.destroy');

//Expense Report
Route::middleware(['permission:expense.report.create'])->group(function () {
    Route::get('/expense-reports', 'ExpenseReportController@index')->name('expense.reports.view');
    Route::post('/expense-reports', 'ExpenseReportController@showData')->name('expense.reports');
});

Route::get('/expense-report', 'ExpenseReportController@onLoad')->middleware(['permission:expense.report.view'])->name('expense.report.view');
// Route::post('/expense-reports', 'ExpenseReportController@showReport');

//Deposit Report
Route::middleware(['permission:deposit.report.create'])->group(function () {
    Route::get('/deposit-reports', 'DepositReportController@index')->name('deposit.reports.view');
    Route::post('/deposit-reports', 'DepositReportController@showData')->name('deposit.reports');
});

Route::middleware(['permission:deposit.report.view'])->group(function () {
    Route::get('/deposit-report', 'DepositReportController@onLoad')->name('deposit.report.view');
    Route::get('/deposit-report-in-details/{depositDate}', 'DepositReportController@depositReportDetails')->name('deposit.reports.details');
});



//Summary Reports
Route::get('/summary-reports', 'SummaryReportController@index')->middleware(['permission:summary.report.view'])->name('summary.reports.view');
Route::post('/summary-reports', 'SummaryReportController@showReport')->middleware(['permission:summary.report.create'])->name('summary.reports');

//Stock report
Route::middleware(['permission:warehouse.stock.reports.view'])->group(function () {
    Route::get('/inventory-stock-reports', 'StockReportController@index')->name('inventory.stock.reports.index');
    Route::post('/inventory-stock-report-data', 'StockReportController@inventoryStockData')->name('inventory.stock.data.default');
});

Route::middleware(['permission:store.stock.reports.view'])->group(function () {
    Route::get('/store-stock-reports', 'StoreStockReportController@index')->name('store.stock.reports.index');
    Route::post('/store-stock-report-data-default', 'StoreStockReportController@storeStockDataDefault')->name('store.stock.data.default');
});

Route::post('/store-stock-report-data/{storeId}', 'StoreStockReportController@storeStockData')->middleware(['permission:store.stock.report.data.create'])->name('store.stock.data');

Route::middleware(['permission:warehouse.stock.reports.view'])->group(function () {
    Route::get('/warehouse-stock-reports', 'WarehouseStockReportController@index')->name('warehouse.stock.reports.index');
    Route::post('/warehouse-stock-report-data', 'WarehouseStockReportController@inventoryStockData')->name('warehouse.stock.data');
});


Route::middleware(['permission:store-stock.index.view'])->group(function () {
    Route::get('/store-stock', 'StoreStockController@index')->name('store-stock.index');
    Route::get('/store-stock-price/{id}', 'StoreStockController@price')->name('store.stock.reports.price');
    Route::post('/store-stock-data-default', 'StoreStockController@storeStockDataDefault')->name('store-stock.data.default');
});

Route::post('/store-stock-data/{storeId}', 'StoreStockController@storeStockData')->middleware(['permission:store-stock.data.create'])->name('store-stock.data');

//expired repost
Route::middleware(['permission:expired-stock.index.view'])->group(function () {
    Route::get('/expired-stock', 'ExpiredStockController@index')->name('expired-stock.index');
    Route::get('/expired-stock-data', 'ExpiredStockController@expiredStockData')->name('expired-stock.data');
});

Route::get('/expired-stock-report-data/{storeId}', 'ExpiredStockController@expiredStoreStockData')->middleware(['permission:expired-stock.store.data.create'])->name('expired-stock.store.data');

Route::middleware(['permission:inventory.expired.stock.index.view'])->group(function () {
    Route::get('/inventory-expired-stock', 'InventoryExpiredStockController@index')->name('inventory-expired-stock.index');
    Route::get('/inventory-expired-stock-data', 'InventoryExpiredStockController@expiredStockData')->name('inventory-expired-stock.data');
});


//low stock
Route::middleware(['permission:low.stock.index.view'])->group(function () {
    Route::get('/low-stock', 'LowStockController@index')->name('low-stock.index');
    Route::get('/low-stock-data', 'LowStockController@lowStockData')->name('low-stock.data');
});

Route::get('/low-stock-report-data/{storeId}', 'LowStockController@lowStocStorekData')->middleware(['permission:low.stock.store.data.create'])->name('low-stock.store.data');

Route::middleware(['permission:inventory.low.stock.index.view'])->group(function () {
    Route::get('/inventory-low-stock', 'InventoryLowStockController@index')->name('inventory-low-stock.index');
    Route::get('/inventory-low-stock-data', 'InventoryLowStockController@lowStockData')->name('inventory-low-stock.data');
});




//-------------------------------------new needed to add permission
//Product-unit
Route::middleware(['permission:product-unit.create'])->group(function () {
    Route::get('/product-unit-create', 'ProductUnitController@create')->name('product-unit.create.view');
    Route::post('/product-unit-create', 'ProductUnitController@store')->name('product-unit.create');
});

Route::middleware(['permission:product-unit.list.view'])->group(function () {
    Route::get('/product-unit-list', 'ProductUnitController@listView')->name('product-unit.list.view');
    Route::get('/product-unit-list-data', 'ProductUnitController@list')->name('product-unit.list');
});

Route::middleware(['permission:product-unit.edit'])->group(function () {
    Route::get('/product-unit-edit/{id}', 'ProductUnitController@edit')->name('product-unit.edit.view');
    Route::put('/product-unit-edit/{id}', 'ProductUnitController@update')->name('product-unit.edit');
    Route::delete('/product-unit-delete/{id}', 'ProductUnitController@destroy');
});


//sales-return
Route::middleware(['permission:sales.return.create'])->group(function () {
    Route::get('/sales-return-create', 'SalesReturnController@create')->name('sales-return.create.view');
    Route::post('/sales-return', 'SalesReturnController@store')->name('sales-return.create');
    Route::get('/sales-return-create/{invoiceno}', 'SalesReturnController@search')->name('sales-return.search');
});

// Route::get('/sales-return-details/{orderId}', 'SalesReturnController@detailsView')->name('sales-return-details.view');

Route::middleware(['permission:sales.return.list.view'])->group(function () {
    Route::get('/sales-return-list', 'SalesReturnController@listView')->name('sales-return.list.view');
    Route::get('/sales-return-list-data', 'SalesReturnController@list')->name('sales-return.list');
    Route::get('/sales-return-details/{returnNumber}', 'SalesReturnController@details')->name('sales-return.details');
});



//expense-category
Route::middleware(['permission:expense.category.create'])->group(function () {
    Route::get('/expense-category-create', 'ExpenseCategoryController@create')->name('expense-category.create.view');
    Route::post('/expense-category-create', 'ExpenseCategoryController@store')->name('expense-category.create');
});

Route::middleware(['permission:expense.category.list.view'])->group(function () {
    Route::get('/expense-category-list', 'ExpenseCategoryController@listView')->name('expense-category.list.view');
    Route::get('/expense-category-list-data', 'ExpenseCategoryController@list')->name('expense-category.list');
});

Route::middleware(['permission:expense.category.edit'])->group(function () {
    Route::get('/expense-category-edit/{id}', 'ExpenseCategoryController@edit')->name('expense-category.edit.view');
    Route::put('/expense-category-edit/{id}', 'ExpenseCategoryController@update')->name('expense-category.edit');
});

Route::delete('/expense-category-delete/{id}', 'ExpenseCategoryController@destroy')->middleware(['permission:expense.categories.destroy'])->name('expense-categories.destroy');

//expense-category

Route::middleware(['permission:expense.create'])->group(function () {
    Route::get('/expense-create', 'ExpenseController@create')->name('expense.create.view');
    Route::post('/expense-create', 'ExpenseController@store')->name('expense.create');
});

Route::middleware(['permission:expense.list.view'])->group(function () {
    Route::get('/expense-list', 'ExpenseController@listView')->name('expense.list.view');
    Route::get('/expense-list-data', 'ExpenseController@list')->name('expense.list');
});

Route::middleware(['permission:expense.edit'])->group(function () {
    Route::get('/expense-edit/{id}', 'ExpenseController@edit')->name('expense.edit.view');
    Route::put('/expense-edit/{id}', 'ExpenseController@update')->name('expense.edit');
});


Route::delete('/expense-delete/{id}', 'ExpenseController@destroy')->middleware(['permission:expenses.destroy'])->name('expenses.destroy');


//Expense Report Sotre wise
Route::get('/expense-store-reports', 'ExpenseStoreReportController@index')->middleware(['permission:expense.store.report.view'])->name('expense-store.reports.view');
Route::post('/expense-store-reports', 'ExpenseStoreReportController@showData')->middleware(['permission:expense-store.reports.create'])->name('expense-store.reports');
// Route::get('/expense-store-report', 'ExpenseStoreReportController@onLoad')->name('expense-store.report.view');


//sales-return report
Route::middleware(['permission:sales.return.report.create'])->group(function () {
    Route::get('/sales-return-reports', 'SalesReturnReportController@index')->name('sales-return.reports.view');
    Route::post('/sales-return-reports', 'SalesReturnReportController@showData')->name('sales-return.reports');
});


Route::get('/sales-return-report', 'SalesReturnReportController@onLoad')->middleware(['permission:sales.return.report.view'])->name('sales-return.reports.onLoad');


//customer creditf
Route::middleware(['permission:customer-credit.create.view'])->group(function () {
    Route::get('/customer-credits', 'CustomerCreditController@indexView')->name('customer-credit.create.view');
    Route::get('/customer-credits-data', 'CustomerCreditController@index')->name('customer-credit.create');
    Route::get('/customer-credit-details/{clientId}', 'CustomerCreditController@showDetails')->name('customer-credit.details');
    Route::get('/customer-order-details/{orderId}', 'CustomerCreditController@orderDetails')->name('customer-order.details');
});


//store-wise product
Route::get('/store-wise-product/{storeId}', 'StoerWiseProductController@data')->name('store-wise-product.data');
Route::get('/inventory-wise-product', 'StoerWiseProductController@inventoryData')->name('inventory-wise-product.data');
//designation
Route::middleware(['permission:designation.create'])->group(function () {
    Route::get('/add-designation', 'DesignationController@create')->name('designation.create.view');
    Route::post('/add-designation', 'DesignationController@store')->name('designation.create');
});
Route::middleware(['permission:designation.list.view'])->group(function () {
    Route::get('/designation-list', 'DesignationController@index')->name('designation.list.view');
    Route::get('/designation-list-data', 'DesignationController@indexData')->name('designation.list.data');
});

Route::middleware(['permission:designation.edit'])->group(function () {
    Route::get('/designation-edit/{id}', 'DesignationController@edit')->name('designation.edit.view');
    Route::put('/designation-edit/{id}', 'DesignationController@update')->name('designation.store');
});

Route::delete('/designation-delete/{id}', 'DesignationController@destroy')->middleware(['permission:designation.destroy'])->name('designation.destroy');


//employee
Route::middleware(['permission:employee.create'])->group(function () {
    Route::get('/employee-create', 'EmployeeController@create')->name('employee.create.view');
    Route::post('/employee-create', 'EmployeeController@store')->name('employee.create');
});

Route::middleware(['permission:employee.list.view'])->group(function () {
    Route::get('/employee-list', 'EmployeeController@index')->name('employee.list.view');
    Route::get('/employee-list-dataX', 'EmployeeController@indexData')->name('employee.list.data');
});
Route::middleware(['permission:employee.edit'])->group(function () {
    Route::get('/employee-edit/{id}', 'EmployeeController@edit')->name('employee.edit.view');
    Route::put('/employee-edit/{id}', 'EmployeeController@update')->name('employee.edit');
});

Route::delete('/employee-delete/{id}', 'EmployeeController@destroy')->middleware(['permission:employee.destroy'])->name('employee.destroy');

//benefit
Route::middleware(['permission:benefit.create'])->group(function () {
    Route::get('/benefit-create', 'BenefitController@create')->name('benefit.create.view');
    Route::post('/benefit-create', 'BenefitController@store')->name('benefit.create');
});

Route::middleware(['permission:benefit.list.view'])->group(function () {
    Route::get('/benefit-list', 'BenefitController@index')->name('benefit.list.view');
    Route::get('/benefit-list-data', 'BenefitController@indexData')->name('benefit.list.data');
});

Route::middleware(['permission:benefit.edit'])->group(function () {
    Route::get('/benefit-edit/{id}', 'BenefitController@edit')->name('benefit.edit.view');
    Route::put('/benefit-edit/{id}', 'BenefitController@update')->name('benefit.edit');
});

Route::delete('/benefit-delete/{id}', 'BenefitController@destroy')->middleware(['permission:benefit.destroy'])->name('benefit.destroy');


//salary
Route::middleware(['permission:salary.create'])->group(function () {
    Route::get('/salary-add', 'SalaryController@create')->name('salary.create.view');
    Route::post('/salary-add', 'SalaryController@store')->name('salary.create');
});

Route::middleware(['permission:salary.list.view'])->group(function () {
    Route::get('/salary-list', 'SalaryController@salaryIndex')->name('salary.list.view');
    Route::get('/salary-list-data', 'SalaryController@salaryIndexData')->name('salary.list.data');
});

Route::middleware(['permission:salary.edit'])->group(function () {
    Route::get('/salary-edit/{id}', 'SalaryController@salaryEdit')->name('salary.edit.view');
    Route::put('/salary-edit/{id}', 'SalaryController@salaryUpdate')->name('salary.edit');
});



Route::delete('/salary-delete/{id}', 'SalaryController@destroy')->middleware(['permission:salary.destroy'])->name('salary.destroy');



// Route::get('/salary-edit/{$id}', 'SalaryController@salaryEdit')->name('salary.edit.view');


//order details for app
// Route::get('/order-details/{id}', 'OrderWEBController@orderDetailsForAppView')->name('order.details.view');
// Route::get('/order-details-data/{id}', 'OrderWEBController@productList')->name('order.details.data');
//***********************New Added*******************//

//Payment Method
Route::middleware(['permission:payment-method.create'])->group(function () {
    Route::get('/payment-method-create', 'PaymentMethodWEBController@create')->name('payment-method.create.view');
    Route::post('/payment-method-create', 'PaymentMethodWEBController@store')->name('payment-method.create');
});
Route::middleware(['permission:payment-method.list.view'])->group(function () {
    Route::get('/payment-method-list', 'PaymentMethodWEBController@listView')->name('payment-method.list.view');
    Route::get('/payment-method-list-data', 'PaymentMethodWEBController@list')->name('payment-method.list');
});
Route::middleware(['permission:payment-method.edit'])->group(function () {
    Route::get('/payment-method-edit/{id}', 'PaymentMethodWEBController@edit')->name('payment-method.edit.view');
    Route::put('/payment-method-edit/{id}', 'PaymentMethodWEBController@update')->name('payment-method.edit');
});

Route::delete('/payment-method-delete/{id}', 'PaymentMethodWEBController@destroy')->middleware(['permission:payment-methods.destroy'])->name('payment-methods.destroy');

// //HoldSale
// Route::post('/hold-sale-create', 'HoldSaleController@store')->middleware(['permission:hold-sale.create'])->name('hold-sale.create');
// Route::get('/hold-list-data', 'HoldSaleController@list')->middleware(['permission:hold-list.data'])->name('hold-list.data');
// Route::get('/hold-data/{referenceId}', 'HoldSaleController@edit')->middleware(['permission:hold.edit'])->name('hold.edit');
// Route::delete('/hold-data-delete/{referenceId}', 'HoldSaleController@delete')->middleware(['permission:hold.destroy'])->name('hold.destroy');


//chart of accounts
Route::middleware(['permission:chart-of-accounts.create'])->group(function () {

    Route::post('/chart-of-account-create', 'ChartOfAccountController@store');
});
Route::middleware(['permission:chart-of-accounts.list.view'])->group(function () {

    Route::get('/chart-of-accounts', 'ChartOfAccountController@index');
    Route::get('/chart-of-accounts-data', 'ChartOfAccountController@data');
    Route::get('/chart-of-accounts-get-data/{headCode}', 'ChartOfAccountController@getData');
    Route::get('/chart-of-accounts-get-data-new/{headCode}', 'ChartOfAccountController@getDataNew');
});
Route::middleware(['permission:chart-of-accounts.edit'])->group(function () {
    Route::put('/chart-of-accounts-get-data/{id}', 'ChartOfAccountController@getDataUpdate');
});


//Bank
Route::middleware(['permission:bank.create'])->group(function () {
    Route::get('/bank-create', 'BankController@create')->name('bank.create.view');
    Route::post('/bank-create', 'BankController@store')->name('bank.create');
});

Route::middleware(['permission:bank.list.view'])->group(function () {
    Route::get('/bank-list', 'BankController@listView')->name('bank.list.view');
    Route::get('/bank-list-data', 'BankController@list')->name('bank.list');
});

Route::middleware(['permission:bank.edit'])->group(function () {
    Route::get('/bank-edit/{id}', 'BankController@edit')->name('bank.edit.view');
    Route::put('/bank-edit/{id}', 'BankController@update')->name('bank.edit');
});



Route::delete('/bank-delete/{id}', 'BankController@destroy')->middleware(['permission:bank.destroy'])->name('bank.destroy');

//Purchase Voucher
Route::middleware(['permission:purchase-voucher.create'])->group(function () {
    Route::get('/purchase-voucher-create', 'PurchaseVoucherController@index')->name('purchase-voucher.create.view');
    Route::post('/purchase-voucher-create', 'PurchaseVoucherController@store')->name('purchase-voucher.create');
    Route::get('/purchase-voucher-report', 'PurchaseVoucherController@view')->name('purchase-voucher.report.view');
    Route::get('/purchase-voucher-report/{transaction_id}/{startdate}/{enddate}/{transaction_type}', 'PurchaseVoucherController@show')->name('purchase-voucher.report');
});

//Supplier Payment
Route::middleware(['permission:supplier-payment.create'])->group(function () {
    Route::get('/supplier-payment-create', 'SupplierPaymentController@index')->name('supplier-payment.create.view');
    Route::post('/supplier-payment-create', 'SupplierPaymentController@store')->name('supplier-payment.create');

    Route::get('/get-supplier-head-code/{getHeadCode}', 'SupplierPaymentController@getHeadCode')->name('get.supplier.headcode');
    Route::get('/get-balance-by-supplier-head-code/{getHeadCode}', 'SupplierPaymentController@getBalanceByHeadCode')->name('get.balance.supplier.headcode');

});

//Sales Voucher
Route::middleware(['permission:sales-voucher.create'])->group(function () {
    Route::get('/sales-voucher-create', 'SalesVoucherController@index')->name('sales-voucher.create.view');
    Route::post('/sales-voucher-create', 'SalesVoucherController@store')->name('sales-voucher.create');
    Route::get('/sales-voucher-report', 'SalesVoucherController@view')->name('sales-voucher.report.view');
    Route::get('/sales-voucher-report/{transaction_id}/{startdate}/{enddate}/{transaction_type}', 'SalesVoucherController@show')->name('sales-voucher.report');
});


//Customer Receive
Route::middleware(['permission:customer-receive.create'])->group(function () {
    Route::get('/customer-receive-create', 'CustomerReceiveController@index')->name('customer-receive.create.view');
    Route::post('/customer-receive-create', 'CustomerReceiveController@store')->name('customer-receive.create');
    Route::get('/customer-receive-report', 'CustomerReceiveController@view')->name('customer-receive.report.view');
    Route::get('/customer-receive-report/{transaction_id}/{startdate}/{enddate}/{transaction_type}', 'CustomerReceiveController@show')->name('customer-receive.report');
});


//Expense Voucher
Route::middleware(['permission:expense-voucher.create'])->group(function () {
    Route::get('/expense-voucher-create', 'ExpenseVoucherController@index')->name('expense-voucher.create.view');
    Route::post('/expense-voucher-create', 'ExpenseVoucherController@store')->name('expense-voucher.create');
    Route::get('/expense-voucher-report', 'ExpenseVoucherController@view')->name('expense-voucher.report.view');
    Route::get('/expense-voucher-report/{transaction_id}/{startdate}/{enddate}/{transaction_type}', 'ExpenseVoucherController@show')->name('expense-voucher.report');
});

//Journal Voucher
Route::middleware(['permission:journal-voucher.create'])->group(function () {
    Route::get('/journal-voucher-create', 'JournalVoucherController@index')->name('journal-voucher.create.view');
    Route::post('/journal-voucher-create', 'JournalVoucherController@store')->name('journal-voucher.create');
    Route::get('/journal-voucher-report', 'JournalVoucherController@view')->name('journal-voucher.report.view');
    Route::get('/journal-voucher-report/{transaction_id}/{startdate}/{enddate}/{transaction_type}', 'JournalVoucherController@show')->name('journal-voucher.report');
});

//Opening Balance
Route::middleware(['permission:opening-balance.create'])->group(function () {
    Route::get('/opening-balance-create', 'OpeningBalanceController@index')->name('opening-balance.create.view');
    Route::post('/opening-balance-create', 'OpeningBalanceController@store')->name('opening-balance.create');
    Route::get('/opening-balance-report', 'OpeningBalanceController@view')->name('opening-balance.report.view');
    Route::get('/opening-balance-report/{transaction_id}/{startdate}/{enddate}/{transaction_type}', 'OpeningBalanceController@show')->name('opening-balance.report');
});

//general-ledger
Route::middleware(['permission:balance-sheet.view'])->group(function(){
    Route::get('/general-ledger', 'GeneralLedger@index')->name('general-ledger.view');
    Route::get('/general-ledger/{headcode}/{startdate}/{enddate}', 'GeneralLedger@data')->name('general-ledger.data');
});



//Opening Balance
Route::middleware(['permission:add-account.create'])->group(function () {
    Route::get('/add-account', 'AccountController@index')->name('add-account.create.view');
    Route::get('/account-parent-head/{rootHeadCode}', 'AccountController@getPaerntHead')->name('parent-head.data');
    Route::post('/account-create', 'AccountController@store')->name('parent-head.store');
});

Route::middleware(['permission:account-list.view'])->group(function () {
    Route::get('/account-list', 'AccountController@listView')->name('account-list.view');
    Route::get('/account-list-data', 'AccountController@list')->name('account-list.data');
});


//Trial Balance
Route::middleware(['permission:trial-balance.view'])->group(function () {
    Route::get('/trial-balance', 'TrialBalanceController@index')->name('trial-balance.view');
    Route::get('/trial-balance-data', 'TrialBalanceController@data')->name('trial-balance.data');
    Route::post('/trial-balance-datewise', 'TrialBalanceController@dateWise')->name('trial-balance-datewise.data');
});


//Income Statement
Route::middleware(['permission:income-statement.view'])->group(function () {
    Route::get('/income-statement', 'IncomeStatementController@index')->name('income-statement.view');
    Route::get('/income-statement-data', 'IncomeStatementController@data')->name('income-statement.data');
    Route::post('/income-statement-datewise', 'IncomeStatementController@dateWiseData')->name('income-statement-datewise.data');
});



//purchase-return
Route::middleware(['permission:purchase-return.create'])->group(function () {
    Route::get('/purchase-return-create', 'PurchaseReturnController@create')->name('purchase-return.create.view');
    Route::get('/purchase-return-create/{poNo}', 'PurchaseReturnController@search')->name('purchase-return.search');
    // Route::get('/purchase-return-details/{orderId}', 'PurchaseReturnController@detailsView')->name('purchase-return-details.view');
    Route::post('/purchase-return', 'PurchaseReturnController@store')->name('purchase-return.create');
});

Route::middleware(['permission:purchase-return.list.view'])->group(function () {
    Route::get('/purchase-return-list', 'PurchaseReturnController@listView')->name('purchase-return.list.view');
    Route::get('/purchase-return-list-data', 'PurchaseReturnController@list')->name('purchase-return.list');
    Route::get('/purchase-return-details/{returnNumber}', 'PurchaseReturnController@details')->name('purchase-return.details');
});




//shift
Route::middleware(['permission:shift.create'])->group(function () {
    Route::get('/shift-create', 'ShiftController@create')->name('shift.create.view');
    Route::post('/shift-create', 'ShiftController@store')->name('shift.create');
    //shift-allocate
    Route::post('/shift-allocate', 'ShiftController@allocateShift')->name('allocate-shift.create');
});
Route::middleware(['permission:shift.list.view'])->group(function () {
    Route::get('/shift-list', 'ShiftController@listView')->name('shift.list.view');
    Route::get('/shift-list-data', 'ShiftController@list')->name('shift.list');
});

Route::middleware(['permission:shift.edit'])->group(function () {
    Route::get('/shift-edit/{id}', 'ShiftController@edit')->name('shift.edit.view');
    Route::put('/shift-edit/{id}', 'ShiftController@update')->name('shift.edit');
});

Route::delete('/shift-delete/{id}', 'ShiftController@destroy')->middleware(['permission:shift.destroy'])->name('shift.destroy');




//holiday
Route::middleware(['permission:holiday.create'])->group(function () {
    Route::get('/holiday-create', 'HolidayController@create')->name('holiday.create.view');
    Route::post('/holiday-create', 'HolidayController@store')->name('holiday.create');
});
Route::middleware(['permission:holiday.list.view'])->group(function () {
    Route::get('/holiday-list', 'HolidayController@listView')->name('holiday.list.view');
    Route::get('/holiday-list-data', 'HolidayController@list')->name('holiday.list');
});

Route::middleware(['permission:holiday.edit'])->group(function () {

    Route::get('/holiday-edit/{id}', 'HolidayController@edit')->name('holiday.edit.view');
    Route::put('/holiday-edit/{id}', 'HolidayController@update')->name('holiday.edit');
});

Route::delete('/holiday-delete/{id}', 'HolidayController@destroy')->middleware(['permission:holiday.destroy'])->name('holiday.destroy');

//Balance Sheet
Route::middleware(['permission:balance-sheet.view'])->group(function () {

    Route::get('/balance-sheet', 'BalanceSheetController@index')->name('balance-sheet.view');
    Route::get('/balance-sheet-data', 'BalanceSheetController@data')->name('balance-sheet.data');
    Route::post('/balance-sheet-datewise', 'BalanceSheetController@dateWiseData')->name('balance-sheet.data');
});


//attendance
Route::middleware(['permission:attendance.create.view'])->group(function () {

    Route::get('/attendance', 'AttendanceController@create')->name('attendance.create.view');
    Route::get('/employee-list-data', 'AttendanceController@employeeList')->name('employee.list.data');
    Route::post('/attendance-status', 'AttendanceController@attendanceStatus')->name('attendance.check-status');
    Route::get('/employee-list-datewise/{date}', 'AttendanceController@employeeListDateWise')->name('employee.list.data.date-wise');
    Route::post('/attendance-submit', 'AttendanceController@attendanceSubmit')->name('attendance.submit');
    Route::get('/employeereports', 'AttendanceController@employeereports_create')->name('employeereports.create.view');
    Route::get('/employeereports_list', 'AttendanceController@employeereports_list')->name('employeereports.create.view');
    Route::post('/employeereports_list', 'AttendanceController@employeereports_list')->name('employeereport.create.view');
});


//weekend
Route::middleware(['permission:weekend.create'])->group(function () {

    Route::get('/weekend-create', 'WeekendController@create')->name('weekend.create.view');
    Route::post('/weekend-create', 'WeekendController@store')->name('weekend.create');
});
Route::middleware(['permission:weekend.list.view'])->group(function () {

    Route::get('/weekend-list', 'WeekendController@listView')->name('weekend.list.view');
    Route::get('/weekend-list-data', 'WeekendController@list')->name('weekend.list');
});

// Route::get('/weekend-edit/{id}', 'WeekendController@edit')->name('weekend.edit.view');
// Route::put('/weekend-edit/{id}', 'WeekendController@update')->name('weekend.edit');
Route::delete('/weekend-delete/{id}', 'WeekendController@destroy')->middleware(['permission:weekend.destroy'])->name('weekend.destroy');


//leave-apply
Route::middleware(['permission:leave-apply.create'])->group(function () {

    Route::get('/leave-apply', 'LeaveApplyController@create')->name('leave-apply.create.view');
    Route::post('/leave-apply', 'LeaveApplyController@store')->name('leave-apply.create');
    Route::get('/leave-type/{id}', 'LeaveApplyController@leaveType')->name('leave-apply.leaveType');
    Route::post('/leave-count-without-holidays', 'LeaveApplyController@leaveCheckWithoutHoliday')->name('leave-count-without.create');
    Route::post('/leave-count-with-holidays', 'LeaveApplyController@leaveCheckWithHoliday')->name('leave-count-with.create');
});


Route::middleware(['permission:leave-apply.list.view'])->group(function () {

    Route::get('/leave-apply-list', 'LeaveApplyController@listView')->name('leave-apply.list.view');
    Route::get('/leave-apply-list-data', 'LeaveApplyController@list')->name('leave-apply.list');
});

Route::middleware(['permission:leave-apply.edit'])->group(function () {

    Route::get('/leave-apply-edit/{id}', 'LeaveApplyController@edit')->name('leave-apply.edit.view');
    Route::put('/leave-apply-edit/{id}', 'LeaveApplyController@update')->name('leave-apply.edit');
});


//Leave Report
Route::middleware(['permission:leave-report.view'])->group(function () {

    Route::get('/leave-report', 'LeaveReportController@index')->name('leave-report.view');
    Route::get('/leave-report-onload', 'LeaveReportController@onLoad')->name('leave-report.onLoad');
    Route::post('/leave-report', 'LeaveReportController@filter')->name('leave-report.filter');
    Route::get('/leave-report-details/{id}', 'LeaveReportController@details')->name('leave-report.details');
    Route::get('/leave-report-details/{id}/{startDate}', 'LeaveReportController@detailsStartDate')->name('leave-report.details-startDate');
    Route::get('/leave-report-details/{id}/{endDate}', 'LeaveReportController@detailsEndtDate')->name('leave-report.details-endDate');
    Route::get('/leave-report-details/{id}/{startDate}/{endDate}', 'LeaveReportController@detailsStartEndDate')->name('leave-report.details-start-endDate');
});





//Leave Type
Route::middleware(['permission:leave-type.create'])->group(function () {

    Route::get('/leave-type-create', 'LeaveTypeController@create')->name('leave-type.create.view');
    Route::post('/leave-type-create', 'LeaveTypeController@store')->name('leave-type.create');
});

Route::middleware(['permission:leave-type.list.view'])->group(function () {

    Route::get('/leave-type-list', 'LeaveTypeController@listView')->name('leave-type.list.view');
    Route::get('/leave-type-list-data', 'LeaveTypeController@list')->name('leave-type.list');
});

Route::middleware(['permission:leave-type.edit'])->group(function () {

    Route::get('/leave-type-edit/{id}', 'LeaveTypeController@edit')->name('leave-type.edit.view');
    Route::put('/leave-type-edit/{id}', 'LeaveTypeController@update')->name('leave-type.edit');
});


Route::delete('/leave-type-delete/{id}', 'LeaveTypeController@destroy')->middleware(['permission:leave-type.destroy'])->name('leave-type.destroy');

//employee-department
Route::middleware(['permission:employee-department.create'])->group(function () {

    Route::get('/employee-department-create', 'EmployeeDepartmentController@create')->name('employee-department.create.view');
    Route::post('/employee-department-create', 'EmployeeDepartmentController@store')->name('employee-department.create');
});
Route::middleware(['permission:employee-department.list.view'])->group(function () {

    Route::get('/employee-department-list', 'EmployeeDepartmentController@listView')->name('employee-department.list.view');
    Route::get('/employee-department-list-data', 'EmployeeDepartmentController@list')->name('employee-department.list');
});
Route::middleware(['permission:employee-department.edit'])->group(function () {


    Route::get('/employee-department-edit/{id}', 'EmployeeDepartmentController@edit')->name('employee-department.edit.view');
    Route::put('/employee-department-edit/{id}', 'EmployeeDepartmentController@update')->name('employee-department.edit');
});

Route::delete('/employee-department-delete/{id}', 'EmployeeDepartmentController@destroy')->middleware(['permission:employee-department.destroy'])->name('employee-department.destroy');

//monthly sale create
Route::middleware(['permission:salary-create.create.view'])->group(function () {

    Route::get('/salary-create', 'SalaryCreateController@create')->name('salary-create.create.view');
    Route::get('/salary-create-onload', 'SalaryCreateController@onLoad')->name('salary-create.onLoad');
    Route::post('/salary-create-filter', 'SalaryCreateController@filter')->name('salary-create.filter');
    Route::post('/salary-store', 'SalaryStoreController@store')->name('salary-create.store');
    Route::get('/salary-pay-slip/{employeeId}/{monthName}', 'SalaryPaySlipController@show')->name('salary-pay-slip.show');
});


//new sales
Route::middleware(['permission:new-sales.create'])->group(function () {
    Route::get('/new-sales-pos-login', 'NewSalesController@posLoginView')->name('new-sales.pos.login.view');
    Route::post('/new-sales-pos-login', 'NewSalesController@posLogin')->name('new-sales.pos.pos-login');

    Route::post('/new-sales-pos-logout', 'NewSalesController@posLogout')->name('new-sales.pos.pos-logout');

    Route::get('/new-sales-create', 'NewSalesController@create')->name('new-sales.create.view');
    Route::post('/new-sales-create', 'NewSalesController@store')->name('new-sales.create');

    Route::get('/product-add/{id}/{storeId}', 'PosCartController@productAdd2')->name('pos.product-add');
    Route::get('/store-wise-pos/{storeId}', 'StoreWisePosController@data')->name('store-wise-pos.data');
    Route::get('/product-new-sales-search/{storeId}/{keyword}', 'PosCartController@newSalesSearch')->name('pos.product.search');
});


//Pay-benefit
Route::middleware(['permission:pay-benefit.create.view'])->group(function () {

    Route::get('/pay-benefit-create', 'PayBenefitController@create')->name('pay-benefit.create.view');
    Route::get('/pay-benefit-create-onload', 'PayBenefitController@onLoad')->name('pay-benefit.onLoad');
    Route::post('/pay-benefit-store', 'PayBenefitController@store')->name('pay-benefit.store');
    Route::post('/pay-benefit-create-filter', 'PayBenefitController@filter')->name('pay-benefit.filter');
    //Route::get('/history/{employeeId}', 'PayBenefitController@history_create')->name('pay-benefit.history_create');
    Route::get('/histories/{employeeId}', 'PayBenefitController@history')->name('pay-benefit.history');
    Route::get('/pay-benefit-slip/{employeeId}/{benefitId}', 'PayBenefitSlipController@show')->name('benefit-pay-slip.show');
});



//weekly sale create
Route::middleware(['permission:weekly-salary-create.create.view'])->group(function () {

    Route::get('/weekly-salary-create', 'WeeklySalaryCreateController@create')->name('weekly-salary-create.create.view');
    Route::get('/weekly-salary-create-onload', 'WeeklySalaryCreateController@onLoad')->name('weekly-salary-create.onLoad');
    Route::post('/weekly-salary-create-filter', 'WeeklySalaryCreateController@filter')->name('weekly-salary-create.filter');
    Route::post('/weekly-salary-store', 'WeeklySalaryStoreController@store')->name('weekly-salary-create.store');
    Route::get('/weekly-salary-pay-slip/{employeeId}/{weekStartDate}/{weekEndDate}', 'WeeklySalaryPaySlipController@show')->name('weekly-salary-pay-slip.show');
});


//Deposit WEB
Route::middleware(['permission:customer-credit.create.view'])->group(function () {
    Route::get('/deposit-create', 'DepositWEBController@create')->name('deposit.create.view');
    Route::post('/deposit-create', 'DepositWEBController@store')->name('deposit.create');
});


// Check-Offer-Qty-POS
Route::post('/check-offer-quantity', 'OrderWEBController@checkofferQty')->name('check-offer-quantity.data');


//Product-Details
Route::get('/product-details/{id}', 'ProductDetailsController@index')->name('product.detials.view');
Route::get('/product-details-data/{id}', 'ProductDetailsController@show')->name('product.detials');


//Product-Excel-Upload
Route::get('/product-excel-demo', 'ProductExcelController@demo')->name('product-excel-get');
Route::get('/product-excel-import', 'ProductExcelController@index')->name('product-excel-view');
Route::post('/product-excel-import', 'ProductExcelController@import')->name('product-excel-import');
Route::get('/product-excel-export', 'ProductExcelController@export')->name('product-excel-export');


//Product-Data
Route::get('/get-product-data', 'ProductDataController@getProductData')->name('get-product-data');
Route::get('/get-product-price/{productId}', 'ProductDataController@getProductPrice')->name('get-product-price');
Route::get('/storewise-product-data/{storeId}', 'ProductDataController@getStoreProduct')->name('get-store-product');

