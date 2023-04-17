import styles from './styles.module.css';
import EyeOn from './EyeOn.svg';
import EyeOff from './EyeOff.svg';
import { useState } from 'react';

type Props = {
    color: string;
    placeholder: string;
    value: string;
    onChange: (newValue: string) => void;
    password?: boolean;
}

export const InputField = ({ color, placeholder, value, onChange, password }: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false)

    const toggleShowPassword = () => { setShowPassword(!showPassword) }

    return (
        <div
            className={styles.container}
            style={{ borderColor: focused ? color : '#eee',
            backgroundColor: focused ? '#fff' : '#eee'
        }}
        >
            <input type={password ? (showPassword ? 'text' : 'password') : 'text'}
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            {password &&
                <div
                    className={styles.showPassword}
                    onClick={toggleShowPassword}
                >
                    {showPassword && <EyeOn />}
                    {!showPassword && <EyeOff />}
                </div>}
        </div>
    );
}

// https://melvingeorge.me/blog/show-or-hide-password-ability-reactjs ShowPassword