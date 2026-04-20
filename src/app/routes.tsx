import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { RecipeDetail } from "./pages/RecipeDetail";
import { Inventory } from "./pages/Inventory";
import { PipelineDiagram } from "./pages/PipelineDiagram";
import { ExportGuide } from "./pages/ExportGuide";
import { PipelinePrintView } from "./pages/PipelinePrintView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/recipe/:id",
    Component: RecipeDetail,
  },
  {
    path: "/inventory",
    Component: Inventory,
  },
  {
    path: "/pipeline",
    Component: PipelineDiagram,
  },
  {
    path: "/pipeline-print",
    Component: PipelinePrintView,
  },
  {
    path: "/export-guide",
    Component: ExportGuide,
  },
]);