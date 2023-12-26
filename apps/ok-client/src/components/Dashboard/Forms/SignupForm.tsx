import React, { useState } from 'react';
import { Button, Form, Input, Typography, Divider } from 'antd';
import { GoogleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
// Replace with your own API and constants paths

const { Title, Text } = Typography;
const { Item: FormItem } = Form;

interface SignupFormProps {
  login: (loginData: any) => void; // Specify the type for loginData as needed
}

const SignupForm: React.FC<SignupFormProps> = ({ login }) => {
  const [page, setPage] = useState<number>(0);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: any) => {
      // Implement submission logic
    },
  });

  const handleSignIn = async () => {
    // Implement your sign-in logic
  };

  const handlePage = () => {
    if (page === 0) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          <Form layout="vertical">
            <Title level={2}>Sign up to OrderKorea</Title>
            <Button type="primary" icon={<GoogleOutlined />} onClick={handleSignIn}>
              Sign up with Google
            </Button>
            <Divider>Or</Divider>
            {/* Rest of your form */}
            <Text type="secondary">
              By creating an account you agree with our Terms of Service, Privacy Policy, and our default Notification Settings.
            </Text>
            {/* Add your link to sign-in page */}
          </Form>
        </div>
      );
    }

    // ... rest of your handlePage logic for different pages
  };

  return <>{handlePage()}</>;
};

export default SignupForm;
