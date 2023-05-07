import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Completely free resume pdf maker",
};

export default function Home() {
  return (
    <>
      <main className={`${styles.main} flex-c full-width align-center`}>
        <Link href="/resume">Create your resume</Link>
      </main>
    </>
  );
}
