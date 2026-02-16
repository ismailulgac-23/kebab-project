import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/products", "routes/products.tsx"),
  route("/products/:id", "routes/product-detail.tsx"),
  route("/cart", "routes/cart.tsx"),

  // Admin Routes
  route("/admin/login", "routes/admin.login.tsx"),
  layout("routes/admin.tsx", [
    route("/admin/dashboard", "routes/admin.dashboard.tsx"),
    route("/admin/products", "routes/admin.products.tsx"),
    route("/admin/orders", "routes/admin.orders.tsx"),
    route("/admin/settings", "routes/admin.settings.tsx"),
  ]),

  // API Routes
  route("/api/upload", "routes/api.upload.ts"),
] satisfies RouteConfig;
