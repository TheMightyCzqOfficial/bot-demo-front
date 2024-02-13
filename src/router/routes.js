
const pythonApp = () => import('views/pythonApp/index')
export default [
  {path: '/',component: pythonApp,},
  // { path: '/', redirect: '/login' },
  // { path: '/login', component: Login },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: Home,
  //   meta: { title: '首页' },
  //   children: [
  //     {
  //       path: '/banner',
  //       component: Banner,
  //       redirect: '/banner/bannerlist',
  //       meta: { title: '轮播图' },
  //       children: [
  //         {
  //           path: '/banner/bannerlist',
  //           component: BannerList,
  //           meta: { title: '首页轮播图' },
  //         }
  //       ]
  //     },
  //     {
  //       path: '/category',
  //       component: Category,
  //       redirect: '/category/categorylist',
  //       meta: { title: '分类管理' },
  //       children: [
  //         {
  //           path: '/category/categorylist',
  //           component: CategoryList,
  //           meta: {
  //             title: '分类列表',
  //             activeMenu: '/categorylist',
  //             activeChildMenu: '/category/addcategory'
  //           }
  //         },
  //         {
  //           path: '/category/addcategory',
  //           name: 'addCategory',
  //           component: AddCategory,
  //           meta: {
  //             title: '添加分类',
  //             activeMenu: '/category',
  //             activeChildMenu: '/category/addcategory'
  //           }
  //         },
  //       ]
  //     },
  //     {
  //       path: '/auth',
  //       component: Auth,
  //       redirect: '/auth/userlist',
  //       meta: { title: '权限管理' },
  //       children: [
  //         {
  //           path: '/auth/userlist',
  //           component: UserList,
  //           meta: { title: '用户管理' },
  //         },
  //         {
  //           path: '/auth/rolelist',
  //           component: RoleList,
  //           meta: { title: '角色管理' },
  //         },
          
  //       ]
  //     },
  //     {
  //       path: '/active',
  //       component: Acitve,
  //       redirect: '/active/activelist',
  //       meta: { title: '活动管理' },
  //       children: [{
  //         path: '/active/activelist',
  //         component: AcitveList,
  //         meta: { title: '首页活动' },
  //       }]

  //     },
  //     {
  //       path: '/goods',
  //       component: Goods,
  //       redirect: '/goods/goodslist',
  //       meta: { title: '商品管理' },
  //       children: [
  //         {
  //           path: '/goods/goodslist',
  //           component: GoodsList,
  //           meta: { title: '商品列表' },
  //         },
  //         {
  //           path: '/goods/detail',
  //           name: 'detail',
  //           component: Detail,
  //           meta: { title: '商品详情' },
  //         },
  //         {
  //           path: '/goods/goodsservice',
  //           component: GoodsService,
  //           meta: { title: '商品服务' },
  //         },
  //         {
  //           path: '/goods/addupdategoods',
  //           name: 'addUpdateGoods',
  //           component: AddUpdateGoods,
  //         },
  //       ]
  //     },

  //     {
  //       path: '/merchant',
  //       component: Merchant,
  //       redirect: '/merchant/merchantlist',
  //       meta: { title: '商家管理' },
  //       children: [
  //         {
  //           path: '/merchant/merchantlist',
  //           component: MerchantList,
  //           meta: { title: '店铺列表' },
  //         },
  //       ]
  //     },
  //     {
  //       path: '/order',
  //       component: Order,
  //       redirect: '/order/orderlist',
  //       meta: { title: '订单管理' },
  //       children: [
  //         {
  //           path: '/order/orderlist',
  //           component: OrderList,
  //           meta: { title: '订单列表' },
  //         },
  //       ]
  //     },
  //     {
  //       path: '/comment',
  //       component: Comment,
  //       redirect: '/comment/commentlist',
  //       meta: { title: '评论管理' },
  //       children: [
  //         {
  //           path: '/comment/commentlist',
  //           component: CommentList,
  //           meta: { title: '评论列表' },
  //         },
  //       ]
  //     },
      
  //   ]
  // },
]