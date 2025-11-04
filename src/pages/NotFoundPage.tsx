import { useNavigate } from 'react-router-dom'
import { Button } from '@components/common/Button'
import { Card } from '@components/common/Card'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <Card className="p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Home className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-gray-600 mb-6">Page not found</p>
        <p className="text-sm text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate('/')} variant="primary" fullWidth>
          Go Home
        </Button>
      </Card>
    </div>
  )
}

