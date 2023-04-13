import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.scss";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${styles.main} flex-c full-width align-center`}>
      <Link href="/resume">Create your resume</Link>
    </main>
  );
}
