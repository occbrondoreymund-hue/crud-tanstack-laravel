
import { Form, Input, Button, message } from "antd";
import { useCreateUser, useUpdateUser } from "../hooks/useUsers";
import { useUserStore } from "../store/userStore";

const UserForm = () => {
  const [form] = Form.useForm();
  const { selectedUser, clearUser } = useUserStore();

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const onFinish = (values) => {
    if (selectedUser) {
      updateMutation.mutate(
        { id: selectedUser.id, data: values },
        {
          onSuccess: () => {
            message.success("User updated");
            clearUser();
            form.resetFields();
          },
          onError: () => message.error("Update failed"),
        }
      );
    } else {
      createMutation.mutate(values, {
        onSuccess: () => {
          message.success("User created");
          form.resetFields();
        },
        onError: () => message.error("Create failed"),
      });
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        {selectedUser ? "Update" : "Create"}
      </Button>
    </Form>
  );
};

export default UserForm;