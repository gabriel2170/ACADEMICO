import Card from './card.svg';
import Money from './money.svg';
import EmailSent from './emailSent.svg';

type Props = {
    width: number;
    height: number;
    svg:string;
    icon: string;
    color: string;
}

export const Icon = ({ icon, color, width, height, svg }: Props) => {
    return (
        <div style={{ width, height }}>
            {icon === 'card' && <Card />}
            {icon === 'money' && <Money />}
            {icon === 'emailSent' && <EmailSent />}
        </div>
    );
} 