```c#
using System;

public class testt
{
    public static void Main(string[] args)
    {
        long num = long.Parse(Console.ReadLine());
        long sum = 0;
        for (int i = 1; i <= num; i++)
        {
            sum += i;
        }
        Console.WriteLine(sum);
	}
}
```