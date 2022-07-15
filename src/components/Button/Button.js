import './Button.scss'
const Button = ({ children,icon }) => {
    const replyIcon = () => {
        return (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 15L6.75 12.75H5.25C4.65326 12.75 4.08097 12.5129 3.65901 12.091C3.23705 11.669 3 11.0967 3 10.5V6C3 5.40326 3.23705 4.83097 3.65901 4.40901C4.08097 3.98705 4.65326 3.75 5.25 3.75H12.75C13.3467 3.75 13.919 3.98705 14.341 4.40901C14.7629 4.83097 15 5.40326 15 6V10.5C15 11.0967 14.7629 11.669 14.341 12.091C13.919 12.5129 13.3467 12.75 12.75 12.75H11.25L9 15Z" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6.75H12" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 9.75H10.5" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        );
    }
    console.log(replyIcon)
    return (
        <button className='button'>
            {icon === 'reply' &&  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 15L6.75 12.75H5.25C4.65326 12.75 4.08097 12.5129 3.65901 12.091C3.23705 11.669 3 11.0967 3 10.5V6C3 5.40326 3.23705 4.83097 3.65901 4.40901C4.08097 3.98705 4.65326 3.75 5.25 3.75H12.75C13.3467 3.75 13.919 3.98705 14.341 4.40901C14.7629 4.83097 15 5.40326 15 6V10.5C15 11.0967 14.7629 11.669 14.341 12.091C13.919 12.5129 13.3467 12.75 12.75 12.75H11.25L9 15Z" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6.75H12" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 9.75H10.5" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>}
            {children}
        </button>
    );
};

export default Button;