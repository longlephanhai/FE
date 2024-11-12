import { useRoutes } from "react-router-dom"
import { routesClient } from "../../routers";

export function AllRouteClient() {
  const element = useRoutes(routesClient);
  return (
    <>
      {element}
    </>
  )
}