import styles from './home.module.css'
import { Header } from '../../components/header'
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
  deleteAddress,
  fetchUsers,
  fetchUserById
} from '../../redux/user/slice';

export function Home() {
  const { user, users, loading } = useSelector((rootReducer) => rootReducer.user)
  const dispatch = useDispatch();

  function handleDeleteAddress() {
    dispatch(deleteAddress())
    alert("Endereço deletado com sucesso!")
  }

  function handlefetchUsers() {
    dispatch(fetchUsers())
  }

  function handlefetchUserById(id) {

    dispatch(fetchUserById(id))
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Login
          </Link>
          <Link to="/painel" className={styles.link}>
            Painel
          </Link>
          <Link to="/address" className={styles.link}>
            Meus endereços
          </Link>
        </nav>

        <main className={styles.content}>
          <div className={styles.message}>
            <h1 className={styles.title}>
              Seja bem vindo, {user ? user.name : "Convidado"}!
            </h1><br />

            {user && (
              <span>Email: {user.email}</span>
            )}

            {user && user.address && (
              <>
                <strong className={styles.addressLabel}>
                  Endereço atual:</strong>
                <div className={styles.address}>
                  <p>{user.address.location}, Nº{user.address.number}</p>

                  <button onClick={handleDeleteAddress}>
                    Deletar endereço
                  </button>
                </div>
              </>
            )}

            <hr />
            <br /><br />
            <h2>Lista de Usuarios</h2>

            <button onClick={handlefetchUsers}>
              {loading ? "Carregando..." : "Buscar Usuarios"}
            </button>
            <br />

            <button onClick={() =>  handlefetchUserById(8)}>
              Buscar Usuario com ID
            </button>

            <br /><br />

            <div className='userBadge'>

              <h3>Lista de usuarios</h3>

              <br /><br />
              {loading && <strong> Carregando usuarios...</strong>}

              {!loading && users.map((user) => (
                <div className={styles.userBadge} key={user.id}>
                  <p>ID: {user.id} - {user.name}</p>
                </div>
              ))}
            </div>

          </div>

        </main>
      </div>
    </>
  )
}
