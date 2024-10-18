import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SiLibreofficewriter } from "react-icons/si";

import useStore from "../stores";
import Chart from "../components/Chart";
import { Table } from "@mantine/core";
import { useAnalytics } from "../hooks/post";

const DashboardPage = () => {
  const { user } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.name) {
      navigate("/auth");
    }
  }, [user]);
  // api Analytics react-query
  const [data, setData] = useState();
  const analytics = useAnalytics(user?._id, setData);
  useEffect(() => {
    analytics.mutate();
  }, []);
  // Hard list + map
  const MENU = [
    {
      icon: <SiLibreofficewriter />,
      label: "Total Posts",
      total: data?.data?.totalPosts,
      diff: 2,
    },
    {
      icon: <SiLibreofficewriter />,
      label: "Total Flowers",
      total: data?.data?.totalFlowers,
      diff: -2,
    },
    {
      icon: <SiLibreofficewriter />,
      label: "Total Views",
      total: data?.data?.totalViews,
      diff: -5,
    },
    {
      icon: <SiLibreofficewriter />,
      label: "Total Writers",
      total: data?.data?.totalWriters,
      diff: 10,
    },
  ];
  // api useMutation : total post, total flower, total views, total writer
  // component chart : stats for last 28 day
  // api chart
  // api 5 post, 5 follower
  // const elementsFollowers = [
  //   {
  //     name: "Nguyen tri",
  //     type: "Writer",
  //     image:
  //       "https://firebasestorage.googleapis.com/v0/b/blog-mern-codewave.appspot.com/o/1728806475271loren-gu-146832-unsplash-550x367.jpg?alt=media&token=2354b500-b159-4982-ad97-afa3f6904135",
  //   },
  //   {
  //     name: "Nguyen tri2",
  //     type: "Writer",
  //     image:
  //       "https://firebasestorage.googleapis.com/v0/b/blog-mern-codewave.appspot.com/o/1728806475271loren-gu-146832-unsplash-550x367.jpg?alt=media&token=2354b500-b159-4982-ad97-afa3f6904135",
  //   },
  // ];
  const rowsFollowers = data?.data?.MostRecentFollowers.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={element.image}
              alt={element.image}
              className="w-full h-full"
            />
          </div>
          <div>
            <h3>{element.name}</h3>
            <p>{element.accountType}</p>
          </div>
        </div>
      </Table.Td>
      <Table.Td>{new Date(element.createdAt).toDateString()}</Table.Td>
    </Table.Tr>
  ));
  // const elementsContents = [
  //   {
  //     title: "Nguyen tri",
  //     views: "9",
  //     type: "Writer",
  //     image:
  //       "https://firebasestorage.googleapis.com/v0/b/blog-mern-codewave.appspot.com/o/1728806475271loren-gu-146832-unsplash-550x367.jpg?alt=media&token=2354b500-b159-4982-ad97-afa3f6904135",
  //   },
  //   {
  //     title: "Nguyen tri2",
  //     views: "4",
  //     type: "Writer",
  //     image:
  //       "https://firebasestorage.googleapis.com/v0/b/blog-mern-codewave.appspot.com/o/1728806475271loren-gu-146832-unsplash-550x367.jpg?alt=media&token=2354b500-b159-4982-ad97-afa3f6904135",
  //   },
  // ];
  const rowsContents = data?.data?.MostRecentPosts.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={element.image}
              alt={element.image}
              className="w-full h-full"
            />
          </div>
          <div>
            <h3>{element.title}</h3>
            <p>{element.category}</p>
          </div>
        </div>
      </Table.Td>
      <Table.Td>{element.views?.length}</Table.Td>
      <Table.Td>{new Date(element.createdAt).toDateString()}</Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {MENU?.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between">
              <b>{item.label}</b>
              {item.icon}
            </div>

            <div>
              <b className="text-2xl">{item.total}</b>
              <sub className={`${item.diff < 0 ? 'text-red-600': 'text-green-600'}`}>{item.diff}%</sub>
            </div>

            <p>Compare to previous month</p>
          </div>
        ))}
      </div>
      <p className="my-3">View stats for last 28 days</p>

      <Chart />

      <div className="flex items-center gap-5">
        <div className="border p-2">
          <h3>Resend 5 flower</h3>
          <div>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Follower</Table.Th>
                  <Table.Th>Join Date</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rowsFollowers}</Table.Tbody>
            </Table>
          </div>
        </div>
        <div className="flex-1 border p-2">
          <h3>Resend 5 content</h3>
          <div>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Post title</Table.Th>
                  <Table.Th>View</Table.Th>
                  <Table.Th>Post data</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rowsContents}</Table.Tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
