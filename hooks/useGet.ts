import { useEffect, useState, useMemo } from "react";
import { GET } from "@/utils/fetch";

export const useGet = <T>(search: Record<string, string>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      setError(null);
      try {
        const response = await GET<T>(search);
        setData(response);
        setError(null);
      } catch (e) {
        setData(null);
        setError((e as Error).message ?? "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(search)]);

  return useMemo(() => ({ isLoading, data, error }), [isLoading, data, error]);
};
