import React, { useEffect, useState } from "react";
import useStore from "../stores";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Menu, Pagination, rem, Table } from "@mantine/core";
import {
  useActive,
  useDeActive,
  useDeletePost,
  useGetPosts,
} from "../hooks/post";
import { HiDotsVertical } from "react-icons/hi";
import { IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ConfirmModal from "../components/ConfirmModal";
import { GrView } from "react-icons/gr";
import { MdInsertComment } from "react-icons/md";

const Contents = () => {
  //auth
  const { user } = useStore();
  const navigate = useNavigate();
  if (!user.name) {
    navigate("/auth");
  }
  //theme : mantin
  const [data, setData] = useState([]);
  const PostTitle = ({ img, title }) => {
    return (
      <div className="flex items-center gap-2 ">
        <div className="w-10 h-10 overflow-hidden rounded-full">
          <img src={img} alt={img} className="w-full h-full" />
        </div>
        <p>{title}</p>
      </div>
    );
  };
  const Status = ({ status }) => {
    return (
      <>
        {status && (
          <span className="py-1 px-8 rounded-full bg-green-500">Active</span>
        )}
        {!status && (
          <span className="py-1 px-8 rounded-full bg-red-500">DeActive</span>
        )}
      </>
    );
  };
  //active,deactive : react-Query
  const [opened, { open, close }] = useDisclosure(false);
  // confirm bằng modal trước rồi mới action : làm sao modal mơ lên và nút submit biết là confirm cho action nào?
  // Giải quyết : await hàm confirm trả true/false core-insuran-portal
  // tạo các biến check đk các thử để gửi hàm đúng vào component modal tùy đk action: cồng kềnh
  // theo tác giả : open/close - handle action gửi vào component tùy case sẽ chạy api nào

  const [typeAction, setTypeAction] = useState("");
  const [postSelected, setPostSelected] = useState({});

  const activePost = useActive(true, postSelected?._id);
  const deActivePost = useDeActive(false, postSelected?._id);
  const deletePost = useDeletePost(postSelected?._id);

  const handleAction = () => {
    switch (typeAction) {
      case "active":
        activePost.mutate();
        break;
      case "deactive":
        deActivePost.mutate();
        break;
      case "delete":
        deletePost.mutate();
        break;
    }
  };

  const Action = ({ status, post }) => {
    return (
      <Menu>
        <Menu.Target>
          <button>
            <HiDotsVertical />
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          {status && (
            <Menu.Item
              onClick={() => {
                setTypeAction("deactive");
                setPostSelected(post);
                open();
              }}
            >
              DeActive
            </Menu.Item>
          )}
          {!status && (
            <Menu.Item
              onClick={() => {
                setTypeAction("active");
                setPostSelected(post);
                open();
              }}
            >
              Active
            </Menu.Item>
          )}

          <Menu.Item
            color="red"
            leftSection={
              <IconTrash style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={() => {
              setTypeAction("delete");
              setPostSelected(post);
              open();
            }}
          >
            Delete post
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  };
  const dataTable = data?.data?.map((item) => [
    <PostTitle img={item.image} title={item.title} />,
    item.category,
    <div className="flex items-center gap-2">
      <GrView /> {item.views?.length}
    </div>,
    <div className="flex items-center gap-2">
    <MdInsertComment /> {item.comments?.length}
  </div>,
    new Date(item.createdAt).toDateString(),
    <Status status={item.status} />,
    <Action status={item.status} post={item} />,
  ]);
  //layout : table mantin
  const tableData = {
    head: [
      "Post title",
      "Category",
      "Views",
      "Comments",
      "Post date",
      "Status",
      "Action",
    ],
    body: dataTable,
  };
  //api getpost : zustand
  const [activePage, setPage] = useState(1);
  const location = useLocation();
  const query = new URLSearchParams(location.search || "?page=1&limit=5");
  const getPosts = useGetPosts(setData, query);

  //action
  //pagination

  //   const location = useLocation();
  //   const navigate = useNavigate();
  //   const query = new URLSearchParams(location.search);

  //   const page = parseInt(query.get('page')) || 1;
  const limit = parseInt(query.get("limit")) || 5;
  useEffect(() => {
    navigate(`?page=${activePage}&limit=${limit}`);
  }, [activePage]);

  useEffect(() => {
    getPosts.mutate();
  }, [location.search]);

  return (
    <div>
      <h3></h3>
      <Table data={tableData} />;
      <div className="flex justify-center">
        <Pagination
          total={data?.pagination?.totalPages}
          value={activePage}
          onChange={setPage}
          mt="sm"
        />
      </div>
      <ConfirmModal handleAction={handleAction} opened={opened} close={close} />
    </div>
  );
};

export default Contents;
