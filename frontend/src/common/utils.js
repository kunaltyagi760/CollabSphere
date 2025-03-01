export const validateInput = (field, value, errors, setErrors) => {
    const newErrors = { ...errors }

    if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
            newErrors.email = 'Please enter a valid email address.'
        } else {
            newErrors.email = '' // Clear error if valid
        }
    }

    if (field === 'password') {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>_-]{8,}$/
        if (!passwordRegex.test(value)) {
            newErrors.password = 'Password must be at least 8 characters long and contain both letters, numbers, and special characters.'
        } else {
            newErrors.password = '' // Clear error if valid
        }
    }

    setErrors(newErrors)
}