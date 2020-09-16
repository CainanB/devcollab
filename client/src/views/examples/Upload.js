import React, {useState} from 'react'

const Upload = () => {

    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const uploadImage= async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'devcollab')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dnf1divya/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()
        setImage(file.secure_url)
        setLoading(false)
    }
  return (
    <>
      <h1>Upload Image</h1>
      <input type="file" 
      name="file"
      placeholder="Upload an image"
      onChange={uploadImage}
      />
      {loading ? (
          <h3>Loading...</h3>
      ):(
          <img src={image} style={{width: '300px'}}/>
  )}
    </>
  )
}

export default Upload
