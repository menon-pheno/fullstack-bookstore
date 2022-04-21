import { Button } from "@mui/material";
import Link from "next/link";

const Admin = () => {
  return (
    <Link href="/admin/add-book">
      <Button variant="contained">新增書本</Button>
    </Link>
  );
};

export default Admin;
