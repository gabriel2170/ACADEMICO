import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Button1 } from '../../components/Button1';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { useAppContext } from '../../contexts/app';
import { useApi } from '../../lib/useApi';
import styles from '../../styles/Partner.module.css';
import { Tenant } from '../../types/Tenant';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from '../../firebase/auth';

const Login = (data: Props) => {
  const { tenant, setTenant } = useAppContext(); // Inicializando o context

  useEffect(() => {
    setTenant(data.tenant);
  }, []); // Setando o tenant no context para pegar as informações

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {

    if (data.tenant.slug == 'delivery1' && password == 'delivery1') {
      if (email == 'pizzariashd@gmail.com') {
        alert('Seja bem vindo ao Menu de login da Pizzaria do Tiao')
        Router.push('/delivery1/admin')
      }
    }
    else if (data.tenant.slug == 'delivery2' && password == 'delivery2') {
      if (email == 'cervejariashd@gmail.com') {
        alert('Seja bem vindo ao Menu de login da Cervejaria da Marlene')
        Router.push('/delivery2/admin')
      }
    }
    else if (data.tenant.slug == 'delivery3' && password == 'delivery3') {
      if (email == 'hamburgueriashd@gmail.com') {
        alert('Seja bem vindo ao Menu de login do Ze do Burguer')
        Router.push('/delivery3/admin')
      }
    }

    else if (data.tenant.slug == 'delivery4') {
      if (email == 'sorveteriashd@gmail.com' && password == 'delivery4') {
        alert('Seja bem vindo ao Menu de login da Sorveteria do Lionel')
        Router.push('/delivery4/admin')
      }
    }

    else {
      alert('Login de PARCEIRO incorreto!!')
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Safe Home Delivery | Login </title>
      </Head>

      <Header
        color={data.tenant.primaryColor}
        backHref={'/' + data.tenant.slug + '/login'}
      />

      <div className={styles.title}>Safe Home Delivery | Parceiro</div>

      <div className={styles.tenant} style={{ color: data.tenant.primaryColor }}>| {data.tenant.name} |</div>

      <div className={styles.subtitle}>Informe seus dados</div>

      <div className={styles.formArea}>
        <div className={styles.inputArea}>
          <InputField
            color={data.tenant.primaryColor}
            placeholder="Email"
            value={email}
            onChange={setEmail}
          />
        </div>

        <div className={styles.inputArea}>
          <InputField
            color={data.tenant.primaryColor}
            placeholder="Senha"
            value={password}
            onChange={setPassword}
            password
          />
        </div>

        <div className={styles.inputArea}>
          <Button1
            color={data.tenant.primaryColor}
            label="Entrar"
            onClick={handleSubmit}
            fill
          />
        </div>

      </div>

    </div>
  );
}

export default Login;

// Função usada para pegar os tenants/estabelecimentos existentes no app, redirecionando para as urls dos mesmos.
type Props = {
  tenant: Tenant
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  console.log('Tenant: ', tenantSlug)
  const api = useApi(tenantSlug as string);

  const tenant = await api.getTenant();

  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  } // Bloqueando o acesso a tenants/estabelecimentos que não existem e voltando pra pagina inicial.

  return {
    props: {
      tenant
    }
  }

}