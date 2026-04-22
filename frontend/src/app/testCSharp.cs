using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace src.app
{
    public class testCSharp
    {
        public string sumarPares(string listaNumeros)
        {
            int[] numeros = listaNumeros.Split(' ')
                                 .Select(int.Parse)
                                 .ToArray();

            int sumaPares = 0;
            for (i = 0; numeros <= numeros.length; i++)
            {
                if (numeros[i] % 2 == 0 && numeros[i] != 0)
                    sumaPares += numeros[i];
                else if (numeros[i] == 0)
                    break;
            }

            return sumaPares;
        }
    }
}