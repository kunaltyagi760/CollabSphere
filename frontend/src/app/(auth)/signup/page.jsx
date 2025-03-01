'use client'
import { validateInput } from '@/common/utils'
import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import Link from 'next/link'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignUpPage = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    })
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [eyeOpen, setEyeOpen] = useState(false);
    const toggleEye = () => setEyeOpen(!eyeOpen);

    const handleChange = (action, value) => {
        setData(prevData => ({
            ...prevData,
            [action]: value
        }))
        validateInput(action, value, errors, setErrors) // Validate input on change
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Only submit if there are no errors
        if (validateForm()) {
            console.log(data) // Form data is valid, proceed with submission
        }
    }

    const validateForm = () => {
        // The form is valid if there are no errors and all fields are filled out
        return !errors.name && !errors.email && !errors.password && !errors.confirmPassword && data.name && data.email && data.password && data.confirmPassword && data.password === data.confirmPassword
    }

    const handleAgreeToTermsChange = (e) => {
        setData(prevData => ({
            ...prevData,
            agreeToTerms: e.target.checked
        }))
    }

    return (
        <div className='p-4 sm:p-8'>
            <div className='text-center mb-8'>
                <h3 className='font-semibold text-2xl'>Create Your Account</h3>
                <p className='text-slate-500'>Please fill in the form to create a new account</p>
            </div>

            {/* <div>
                <Button varient={'outlined'} color={'slate-700'}>
                    Email Only
                </Button>
            </div> */}
            {/* <p className='text-slate-500 text-center my-4'>or</p> */}
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <Input
                    type="text"
                    placeholder="Enter your name"
                    onChange={(e) => handleChange('name', e.target.value)}
                    value={data.name}
                    error={errors?.name}
                />

                <Input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => handleChange('email', e.target.value)}
                    value={data.email}
                    error={errors?.email}
                />

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

                <Input
                    type={eyeOpen ? "text" : "password"}
                    placeholder="Confirm your password"
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    value={data.confirmPassword}
                    endIcon={eyeOpen ?
                        <FaRegEyeSlash onClick={toggleEye} />
                        :
                        <FaRegEye onClick={toggleEye} />
                    }
                    error={errors?.confirmPassword}
                />

                <div className='flex items-center'>
                    <label>
                        <input
                            type="checkbox"
                            checked={data.agreeToTerms}
                            onChange={handleAgreeToTermsChange}
                            className='mt-2'
                        />
                        <span className='select-none'> I agree to the Terms and Conditions</span>
                    </label>
                </div>
                <div className='mt-8'>
                    <Button
                        varient={'contained'}
                        type="submit"
                        disabled={!validateForm()}
                        color={'bg-slate-800'}
                    >
                        Sign Up
                    </Button>
                </div>
            </form>

            <div className='text-center mt-16'>
                <p className='text-slate-500'>Already have an account? <Link href='/signin' className='underline'>Login</Link></p>
            </div>
        </div>
    )
}

export default SignUpPage;
