"use client";

import Layout from "@/app/dashboard/Layout";
import WorkspaceTabs from "@/components/FetchWorkspace";

import TabDataComponent from "@/components/TabData";

export default function Home() {
  return (
    <Layout>
      <WorkspaceTabs />
      <div className="flex flex-col">
        <TabDataComponent />
      </div>
    </Layout>
  );
}
