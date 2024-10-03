using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hhh
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int num = int.Parse(Console.ReadLine());
            int summation = 0;
            for (int i = 1; i <= num; i++)
            {
                summation += i;
            }
            Console.WriteLine(summation);
        }
    }
    
}
