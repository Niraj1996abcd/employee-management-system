
interface StatCardProps {
  title: string;
  value: number;
  description: string;
}

const StatCard = ({
  title,
  value,
  description,
}: StatCardProps) => {
  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-gray-800">
        {value}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
};

export default StatCard;

