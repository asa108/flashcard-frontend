import Head from "next/head";
import { useRouter } from "next/router";

import styles from "@/styles/Layout.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "./SideBar";

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />

      {/* urlが / の時だけ表示される */}
      {/*
      {router.pathname === "/" && <Showcase />}
      */}

      <Sidebar />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Flashcard | for english learner",
  description: "Welcome to flashcard",
  keyword: "English, Languages",
};
