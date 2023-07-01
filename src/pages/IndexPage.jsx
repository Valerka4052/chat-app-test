import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const IndexPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login')
    return navigate('/dashboard')
 
  }, [navigate])
  return (
    <div>
      IndexPage
      <Link to='/login'>login</Link>
    </div>
  )
}

export default IndexPage
