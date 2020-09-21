import React from 'react'
import loading from './loading4.gif'

export default () => {
    return (
        <> 
            <img 
                src={loading}
                style={{width: '200px', margin: 'auto', display:'block'}}
                alt="Loading..."
            />
        </>
    )
}