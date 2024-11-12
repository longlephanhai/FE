import { useRoutes } from "react-router-dom"
import { routes } from "../../routers/client";

export function AllRoute() {
  const element = useRoutes(routes);
  return (
    <>
      {element}
    </>
  )
}