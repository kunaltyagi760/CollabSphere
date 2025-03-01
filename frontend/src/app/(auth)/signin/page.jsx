'use client'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import Link from 'next/link'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const Page = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        rememberMe: false
    })
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })
    const [eyeOpen, setEyeOpen] = useState(false);
    const toggleEye = () => setEyeOpen(!eyeOpen);

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
            <div className='text-center mb-8'>
                <h3 className='font-semibold text-2xl'>Welcome Back!</h3>
                <p className='text-slate-500'>Please sign-in to your account</p>
            </div>

            <div>
                <Button varient={'outlined'} color={'slate-700'}>
                    Email Only
                </Button>
            </div>
            <p className='text-slate-500 text-center my-4'>or</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <Input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => handleChange('email', e.target.value)}
                    value={data.email}
                    error={errors?.email}
                />
                {/* {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>} */}

                <Input
                    type={eyeOpen ? "text" : "password"}
                    placeholder="Enter your password"
                    onChange={(e) => handleChange('password', e.target.value)}
                    value={data.password}
                    endIcon={eyeOpen ?
                        <FaRegEyeSlash onClick={toggleEye} />
                        :
                        <FaRegEye onClick={toggleEye} />
                    }
                    error={errors?.password}
                />
                {/* {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>} */}

                <div className='flex items-center'>
                    <label>
                        <input
                            type="checkbox"
                            checked={data.rememberMe}
                            onChange={handleRememberMeChange}
                            className='mt-2'
                        />
                        <span className='select-none'> Remember me</span>
                    </label>
                </div>
                <div className='mt-8'>
                    <Button
                        varient={'contained'}
                        type="submit"
                        disabled={!validateForm()}
                        color={'bg-slate-800'}
                    >
                        Submit
                    </Button>
                </div>
            </form>

            <div className='text-center mt-16'>
                <p className='text-slate-500'>Don't you have an account? <Link href='/signup' className='underline'>Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Page
