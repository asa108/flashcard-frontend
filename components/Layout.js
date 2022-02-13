import Head from "next/head";
import styles from "@/styles/Layout.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "./SideBar";

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
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
