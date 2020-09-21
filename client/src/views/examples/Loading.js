import React from 'react'
import loading from './loading.svg'

export default () => {
    return (
        <> 
            <img 
                src={loading}
                style={{width: '100px', margin: 'auto', display:'block'}}
                alt="Loading..."
            />
        </>
    )
}