import styles from "@/app/(beforeLogin)/_component/main.module.css";

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function BeforeLoginLayout({ children, modal }: Readonly<Props>) {
  return (
    <div className={styles.container}>
      {children}
      {modal}
    </div>
  );
}
