import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useAnalytics = (userID,setData) =>
  useMutation({
    mutationFn: (dataCreate) => {
      return axios.get(
        `http://localhost:8800/posts/analytics/${userID}`,
        dataCreate,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token-blog-codewave')}` // Include the token here
            }
        }
      );
    },
    onSuccess: (values) => {
      // toggle()
      console.log('values',values);
      
      setData(values?.data)
      toast.success("Get analytics thành công");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "lỗi service"
      );
    },
  });
export const useGetPosts = (setData,query) =>
  useMutation({
    mutationFn: (dataCreate) => {
      return axios.get(
        `http://localhost:8800/posts?${query}`,
        dataCreate,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token-blog-codewave')}` // Include the token here
            }
        }
      );
    },
    onSuccess: (values) => {
      // toggle()
      console.log('values',values);
      
      setData(values?.data)
      toast.success("GetPosts thành công");
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "lỗi service"
      );
    },
  });

export const useCreate = (token) =>
  useMutation({
    mutationFn: (dataCreate) => {
      return axios.post(
        `http://localhost:8800/posts/create`,
        dataCreate,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token here
            }
        }
      );
    },
    onSuccess: (values) => {
      // toggle()
      toast.success("Create thành công");
      setTimeout(() => {
        window.location.replace('/contents')
      }, 1000);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "lỗi service"
      );
    },
  });

export const useActive = (status, postID) => useMutation({
  mutationFn: () => {
    return axios.post(
      `http://localhost:8800/posts/active`,
      {status,postID},
      {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token-blog-codewave')}` // Include the token here
          }
      }
    );
  },
  onSuccess: (values) => {
    // toggle()
    toast.success("Active post thành công");
    setTimeout(() => {
      window.location.replace('/contents')
    }, 1000);
  },
  onError: (err) => {
    toast.error(
      err?.response?.data?.message || err?.message || "lỗi service"
    );
  },
});
export const useDeActive = (status, postID) => useMutation({
  mutationFn: () => {
    return axios.post(
      `http://localhost:8800/posts/deactive`,
      {status,postID},
      {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token-blog-codewave')}` // Include the token here
          }
      }
    );
  },
  onSuccess: (values) => {
    // toggle()
    toast.success("DeActive post thành công");
    setTimeout(() => {
      window.location.replace('/contents')
    }, 1000);
  },
  onError: (err) => {
    toast.error(
      err?.response?.data?.message || err?.message || "lỗi service"
    );
  },
});
export const useDeletePost = (postID) => useMutation({
  mutationFn: () => {
    return axios.delete(
      `http://localhost:8800/posts/delete/${postID}`,
      {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token-blog-codewave')}` // Include the token here
          }
      }
    );
  },
  onSuccess: (values) => {
    // toggle()
    toast.success("Delete post thành công");
    setTimeout(() => {
      window.location.replace('/contents')
    }, 1000);
  },
  onError: (err) => {
    toast.error(
      err?.response?.data?.message || err?.message || "lỗi service"
    );
  },
});