
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import "antd/dist/reset.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: 20 }}>
        <h1>CRUD        -by Brondex</h1>
        <UserForm />
        <UserTable />
      </div>
    </QueryClientProvider>
  );
}

export default App;