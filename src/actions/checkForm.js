import axios from 'axios'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEyNjlmMmRlYTNkNTQxMTZjZTg1MmFhIiwicm9sZSI6Imd1ZXN0In0sImlhdCI6MTYzMTUxOTM1MSwiZXhwIjoxOTkxNTE5MzUxfQ.U81e5ypmogZC8ighM5Hqd49PEzFigbeBDZsnPBFaPbM"

export const addCheckData = async (checkData) => {

    try {
        const config = {
            headers: {
                'Content-type':'application/json',
                'x-auth-token' : token
            }
        }

    await axios.post('http://localhost:8080/api/projects', checkData, config)

    } catch (err) {
        const errors = err.responose

        if(errors) {
            console.log(errors);
        }
    }
    
}
