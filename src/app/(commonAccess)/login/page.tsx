import Image from "next/image";
import styles from "./page.module.css";
import Login from "./_components/page";

export default function Page() {
  return (
    <main>
      <h2>로그인</h2>
      <Login />
    </main>
  );
}
