export const backendDomin = "http://localhost:8080"
const Summary = {
  signUp: {
    url: `${backendDomin}/api/auth/login`,
    method: "post"
  },
  checkToken: {
    url: `${backendDomin}/api/auth/login`,
    method: "get"
  },
  getUser: {
    url: `${backendDomin}/api/user`,
    method: "get"
  },
  getRole: {
    url: `${backendDomin}/api/user`,
    method: "post"
  },
  getProduct: {
    url: `${backendDomin}/api/product`,
    method: "get"
  },
  detailProduct: {
    url: `${backendDomin}/api/product/`,
    method: "get"
  },
  deleteProduct: {
    url: `${backendDomin}/api/product/delete`,
    method: "post"
  },
  editProduct: {
    url: `${backendDomin}/api/product/edit/`,
    method: "post"
  },
  createProduct: {
    url: `${backendDomin}/api/product/create`,
    method: "post"
  },
  changeMultiStatus: {
    url: `${backendDomin}/api/product/change-multi-status`,
    method: "post"
  },
  createProductCategory: {
    url: `${backendDomin}/api/product-category/create`,
    method: "post"
  },
  getProductCategory: {
    url: `${backendDomin}/api/product-category`,
    method: "get"
  },
  getProductCategoryById: {
    url: `${backendDomin}/api/product-category/detail/`,
    method: "get"
  },
  editProductCategory: {
    url: `${backendDomin}/api/product-category/edit/`,
    method: "post"
  },
  deleteProductCategory: {
    url: `${backendDomin}/api/product-category/delete`,
    method: "post"
  },
  getRoles: {
    url: `${backendDomin}/api/roles`,
    method: "get"
  },
  createRole: {
    url: `${backendDomin}/api/roles/create`,
    method: "post"
  },
  getRoleById: {
    url: `${backendDomin}/api/roles/`,
    method: "get"
  },
  editRole: {
    url: `${backendDomin}/api/roles/edit/`,
    method: "post",
  },
  deleteRole: {
    url: `${backendDomin}/api/roles/delete`,
    method: "post",
  },
  getPermissions: {
    url: `${backendDomin}/api/permissions`,
    method: "get"
  },
  editPermissions: {
    url: `${backendDomin}/api/permissions/edit`,
    method: "post"
  },
  getAccounts: {
    url: `${backendDomin}/api/accounts`,
    method: "get"
  },
  createAccount: {
    url: `${backendDomin}/api/accounts/create`,
    method: "post"
  },
  deleteAccount: {
    url: `${backendDomin}/api/accounts/delete`,
    method: "post"
  },
  getAccountById: {
    url: `${backendDomin}/api/accounts/detail/`,
    method: "get"
  },
  editAccount: {
    url: `${backendDomin}/api/accounts/edit/`,
    method: "post"
  },
  logout: {
    url: `${backendDomin}/api/auth/logout`,
    method: "get"
  },
  getEmail: {
    url: `${backendDomin}/api/email`,
    method: "get"
  },
  responseEmail: {
    url: `${backendDomin}/api/response-email`,
    method: "post"
  },
  general: {
    url: `${backendDomin}/api/setting`,
    method: "get"
  },
  updateSetting: {
    url: `${backendDomin}/api/setting`,
    method: "get"
  },
  getStatic: {
    url: `${backendDomin}/api/dashboard`,
    method: "get"
  },
  getOrders: {
    url: `${backendDomin}/api/orders`,
    method: "get"
  },
  changeStatusOrder: {
    url: `${backendDomin}/api/change-status-order`,
    method: "post"
  },
  resgister: {
    url: `${backendDomin}/api/user/signup`,
    method: "post"
  },
  signin: {
    url: `${backendDomin}/api/user/signin`,
    method: "post"
  },
  checkTokenUser: {
    url: `${backendDomin}/api/user/checkToken`,
    method: "get"
  },
  home: {
    url: `${backendDomin}/api/user/home`,
    method: "get"
  },
  detailProductClient: {
    url: `${backendDomin}/api/user/detail-product/`,
    method: "get"
  },
  detailUser: {
    url: `${backendDomin}/api/user/detail-user`,
    method: "get"
  },
  logoutUser: {
    url: `${backendDomin}/api/user/logout`,
    method: "get"
  },
  addCart: {
    url: `${backendDomin}/api/user/add`,
    method: "post"
  },
  getCart: {
    url: `${backendDomin}/api/user/get`,
    method: "post"
  },
  deleteCart: {
    url: `${backendDomin}/api/user/delete`,
    method: "post"
  },
  updateQuantity: {
    url: `${backendDomin}/api/user/update`,
    method: "post"
  },
  placeOrder: {
    url: `${backendDomin}/api/user/checkout`,
    method: "post"
  },
  verifyOrder: {
    url: `${backendDomin}/api/user/verify`,
    method: "post"
  },
  getOrder: {
    url: `${backendDomin}/api/user/order`,
    method: "post"
  },
  getOrderById: {
    url: `${backendDomin}/api/user/order/`,
    method: "get"
  },
  categorySlug: {
    url: `${backendDomin}/api/user/home/`,
    method: "get"
  },
  forgotPassword: {
    url: `${backendDomin}/api/user/forgot-password`,
    method: "post"
  },
  otpPassword: {
    url: `${backendDomin}/api/user/opt-password`,
    method: "post"
  },
  resetPassword: {
    url: `${backendDomin}/api/user/reset-password`,
    method: "post"
  },
  email: {
    url: `${backendDomin}/api/user/home/send-email`,
    method: "post"
  },
  setting: {
    url: `${backendDomin}/api/user/settingClient`,
    method: "get"
  },
  basicArea: {
    url: `${backendDomin}/api/basicChart`,
    method: "get"
  }
}
export default Summary;