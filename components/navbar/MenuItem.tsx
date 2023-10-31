'use client';

interface MenuItemProps {
    onClick: () => void;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    label
}) => {
    return (
        <div onClick={onClick} className="px-3 py-3 text-lg hover:scale-105 transition text-center">
            {label}
        </div>
    );
}

export default MenuItem;