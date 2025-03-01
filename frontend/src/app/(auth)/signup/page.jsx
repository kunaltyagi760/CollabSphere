'use client'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import { useState } from 'react'

const page = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        rememberMe: false
    })
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    const handleChange = (action, value) => {
        setData(prevData => ({
            ...prevData,
            [action]: value
        }))
        validateInput(action, value) // Validate input on change
    }

    const validateInput = (field, value) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Only submit if there are no errors
        if (validateForm()) {
            console.log(data) // Form data is valid, proceed with submission
        }
    }

    const validateForm = () => {
        // The form is valid if there are no errors for email and password
        return !errors.email && !errors.password && data.email && data.password
    }

    const handleRememberMeChange = (e) => {
        setData(prevData => ({
            ...prevData,
            rememberMe: e.target.checked
        }))
    }

    return (
        <div className='p-8'>
            <form onSubmit={handleSubmit}>
                <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    onChange={(e) => handleChange('email', e.target.value)} 
                    value={data.email}
                />
                {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}

                <Input 
                    type="password" 
                    placeholder="Enter your password" 
                    onChange={(e) => handleChange('password', e.target.value)} 
                    value={data.password}
                />
                {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}

                <div>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={data.rememberMe} 
                            onChange={handleRememberMeChange} 
                        />
                        Remember me
                    </label>
                </div>

                <Button type="submit" disabled={!validateForm()}>Submit</Button>
            </form>
        </div>
    )
}

export default page
