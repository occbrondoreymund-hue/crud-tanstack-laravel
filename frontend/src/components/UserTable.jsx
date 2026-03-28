
import { Table, Button, Popconfirm, message } from "antd";
import { useUsers, useDeleteUser } from "../hooks/useUsers";
import { useUserStore } from "../store/userStore";

const UserTable = () => {
  const { data, isLoading, error } = useUsers();
  const deleteMutation = useDeleteUser();
  const { setSelectedUser } = useUserStore();

  if (error) return <p>Error loading users</p>;

  const handleDelete = (id) => {
    deleteMutation.mutate(id, {
      onSuccess: () => message.success("Deleted"),
      onError: () => message.error("Delete failed"),
    });
  };

  const columns = [
    { title: "First Name", dataIndex: "first_name" },
    { title: "Last Name", dataIndex: "last_name" },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button onClick={() => setSelectedUser(record)}>Edit</Button>
          <Popconfirm
            title="Delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      rowKey="id"
    />
  );
};

export default UserTable;