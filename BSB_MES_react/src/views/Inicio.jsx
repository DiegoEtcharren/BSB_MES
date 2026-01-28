import { useAuth } from "../hooks/useAuth"

export default function Inicio() {

  const { logout } = useAuth({middleware:'auth'});


  return (
    <div>
      <button
        type='button'
        onClick={ logout }
      >
        Logout
      </button>
    </div>
  )
}
