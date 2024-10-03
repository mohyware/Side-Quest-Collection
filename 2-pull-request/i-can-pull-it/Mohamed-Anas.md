using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cat_Task
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int num = int.Parse(Console.ReadLine());
            int total = 0;
            for (int i = 1; i <= num; i++)
            {
                total += i;
            }
            Console.WriteLine(total);
        }
    }
    
}
