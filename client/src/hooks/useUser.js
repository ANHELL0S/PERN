import React from 'react'
import { useAuth } from '../context/AuthContext'
import { ToastGeneric } from '../components/Toasts/Toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getInfoUserRequest,
  updateAccountRequest
} from '../services/api/user.api'

const useUserStore = () => {
  const { isAuthenticated } = useAuth()
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['account_info'],
    queryFn: getInfoUserRequest,
    staleTime: 60000,
    cacheTime: 300000,
    enabled: isAuthenticated
  })

  React.useEffect(() => {
    if (!isAuthenticated) {
      queryClient.removeQueries(['account_info'])
    }
  }, [isAuthenticated, queryClient])

  return {
    userStore: query.data || [],
    loading: query.isLoading,
    error: query.error
  }
}

const useUpdateAccount = () => {
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuth()

  return useMutation({
    mutationFn: async ({ data }) => {
      if (!isAuthenticated) throw new Error('User is not authenticated')
      return updateAccountRequest(data)
    },
    onSuccess: data => {
      queryClient.invalidateQueries(['user_store'])
      ToastGeneric({ type: 'success', message: data.message })
    },
    onError: error => {
      ToastGeneric({ type: 'error', message: error.message })
    }
  })
}

export { useUserStore, useUpdateAccount }
