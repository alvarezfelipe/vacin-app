import styles from "./page.module.css";
import { getVaccine, getVaccines } from "../db/schemas/api";

export default async function Home() {
  const vaccines = await getVaccines(undefined, { Schedule: true });

  return (
    <main className={styles.main}>
      <ul>
        {vaccines.map((vaccine) => (
          <li key={vaccine.id}>
            {vaccine.name} - {vaccine.batche}
          </li>
        ))}
      </ul>
    </main>
  );
}
