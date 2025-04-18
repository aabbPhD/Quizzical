import {Hourglass} from 'react-loader-spinner'

export default function MyLoader() {
    return(
        <div className='loader-container'>
            <h1>Fecthing data...</h1>
            <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#306cce', '#72a1ed']}
            />
        </div>  
    )
}
