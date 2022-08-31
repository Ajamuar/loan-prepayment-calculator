import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import DataDrawer from "./components/DataDrawer";
import Header from "./components/Header";
import LoanTable from "./components/LoanTable";

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [principal, setPrincipal] = useState(10000);
  const [rates, setRates] = useState(8);
  const [tenure, setTenure] = useState(12);
  const [prepaymentJSON, setPrepaymentJSON] = useState({});

  return (
    <div className={styles.container}>
      <Head>
        <title>Loan Prepayment Calculator</title>
        <meta
          name="description"
          content="An app to calculate month-wise EMI and prepayment options."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header onOpen={() => setIsOpen((open) => !open)} />
        <DataDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          principal={principal}
          rates={rates}
          tenure={tenure}
          setPrincipal={setPrincipal}
          setRates={setRates}
          setTenure={setTenure}
        />
        <LoanTable
          principal={principal}
          rates={rates}
          tenure={tenure}
          prepaymentJSON={prepaymentJSON}
          setPrepaymentJSON={setPrepaymentJSON}
        />
      </main>
    </div>
  );
};

export default Home;
