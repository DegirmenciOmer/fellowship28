import { useState, useEffect } from 'react'

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await callback()
    } catch (e) {
      console.error(e)
    }
  }
  const onChange = (event, { name, value }) => {
    setValues({ ...values, [name]: value })
  }

  return {
    onChange,
    onSubmit,
    values,
  }
}

export const useLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coords: { lat: '', lng: '' },
  })

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coords: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    })
  }

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    })
  }

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
    return () => {
      cleanup
    }
  }, [input])
  return location
}
