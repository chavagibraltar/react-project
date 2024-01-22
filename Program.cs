
using System;
using System.IO;
using System.Collections.Generic;
// See https://aka.ms/new-console-template for more information
using System.CommandLine;
using System.Security;


//commands
var rootCommand = new RootCommand("Root command for File Bundler CLI");
var bundleCommand = new Command("bundle", "Bundle code files to a single file");
var createRspCommand = new Command("rsp-command", "Creates a response file for bundle command, as per your requirements.");
//options
var outputOption = new Option<FileInfo>("--output", "File path and name");
var languageOption = new Option<string>("--language", "List of programming languages ​​that will be included in the bundle.\n one or more of the following options:\n" +
     "all|c|c#|c++|pyton|java|javascript|html|css");
var noteOption = new Option<bool>("--note", "Whether to list the source code as a comment in the bundle file.\n");
var sortOption = new Option<bool>("--sort-by-file-name", "The order of copying the code files, according to the alphabet of the file name or according to the type of code.\nDefault value will be according to the letter A of the file name.\n");
var removeEmptyLinesOption = new Option<bool>("--remove-empty-lines", "Remove empty lines.");
var authorOption = new Option<string>("--author", "Author's name");
//alias
outputOption.AddAlias("-o");
languageOption.AddAlias("-l");
noteOption.AddAlias("-n");
sortOption.AddAlias("-s");
removeEmptyLinesOption.AddAlias("-r");
authorOption.AddAlias("-a");
//required
outputOption.IsRequired = true;
languageOption.IsRequired = true;
//default
noteOption.SetDefaultValue(false);//not to write the src path in a comment
sortOption.SetDefaultValue(true);//alphabetic order
removeEmptyLinesOption.SetDefaultValue(false);//not to remove the empty lines
authorOption.SetDefaultValue("");//not to write the author's name
//add option to bundle
bundleCommand.AddOption(outputOption);
bundleCommand.AddOption(languageOption);
bundleCommand.AddOption(noteOption);
bundleCommand.AddOption(sortOption);
bundleCommand.AddOption(removeEmptyLinesOption);
bundleCommand.AddOption(authorOption);


//source and destination's path
string currentPath = Directory.GetCurrentDirectory();
List<string> allFolders = Directory.GetFiles(currentPath, "", SearchOption.AllDirectories).Where((f) => !f.Contains("bin") && !f.Contains("Debug") && !f.Contains("node_modules") && !f.Contains(".git") && !f.Contains(".vscode")).ToList();
//languages
string[] allLanguages = { "c#", "c", "c++", "pyton", "java", "javascript", "html", "css" };
string[] allExtensions = { ".cs", ".c", ".cpp", ".py", ".java", ".js", ".html", ".css" };

bundleCommand.SetHandler((output, language, IsNote, IsSortByName, IsRemove, author) =>
{
    //languages
    string[] languages = GetLanguagesExtensions(language, allLanguages, allExtensions);
    List<string> files = allFolders.Where((f) => languages.Contains(Path.GetExtension(f))).ToList();

    //sort
    files = SortFiles(files, IsSortByName);

    //read and write 
    try
    {
        WriteToFile(output, author, IsNote, files, IsRemove, currentPath);
    }
    catch (DirectoryNotFoundException ex)
    {
        Console.WriteLine("Error: File path is invalid");
        Console.WriteLine("exit programing...");
    }
    catch (FormatException ex)
    {
        Console.WriteLine("Error: You may enter only one letter");
        Console.WriteLine("exit programing...");
    }
    catch (Exception ex)
    {
        Console.WriteLine("exit programing...");
    }
}, outputOption, languageOption, noteOption, sortOption, removeEmptyLinesOption, authorOption);

createRspCommand.SetHandler(() =>
{
    string resName, output, languages, author;
    char IsNote, IsSort, IsRemove, IsAuthor;
    try
    {
        Console.WriteLine("please give a name for the response file ");
        resName = Console.ReadLine();
        //char res = char.Parse(Console.ReadLine());
        if (resName == null || resName == "" )
        {
            resName = "responseFile";
        }
      
        StreamWriter file = new StreamWriter($"{resName}.rsp");

        file.Write("fib bundle ");
        //output
        Console.WriteLine("Enter a destination file name (you may add a path).");
        output = Console.ReadLine();
        while (output.Length == 0)
        {
            Console.WriteLine("This argument is required!");
            output = Console.ReadLine();
        }
        file.Write(" -o " + output);

        //languages
        Console.WriteLine("Enter the list of languages ​​you want to include.\n" +
            " If you want to include all languages ​​press \"ALL\".\n" +
            "The other options are: \"c#\", \"c\", \"c++\", \"pyton\", \"java\", \"javascript\", \"html\", \"css\"");
        languages = Console.ReadLine();
        while (languages.Length == 0)
        {
            Console.WriteLine("This argument is required!");
            languages = Console.ReadLine();
        }
        file.Write(" -l " + languages);

        //note
        Console.WriteLine("Do you want to list the source code as a comment in the bundle file?(y/n)");
        IsNote = char.Parse(Console.ReadLine());
        while(!(IsNote == 'y' || IsNote == 'Y' ||IsNote == 'n' || IsNote == 'N'))
        {
            Console.WriteLine("This field is required!");
            IsNote = char.Parse(Console.ReadLine());
        }
        if (IsNote == 'y' || IsNote == 'Y')
            file.Write(" -n " + true);

        //sort
        Console.WriteLine("How to sort the files?\r\nBy name - press \"N\" By type - press \"T\"");
        IsSort = char.Parse(Console.ReadLine());       
        if (IsSort == 't' || IsSort == 'T')
            file.Write("-s " + false);

        //remove-empty-lines
        Console.WriteLine("Do you want to remove the empty lines?(y/n)");
        IsRemove = char.Parse(Console.ReadLine());
        if (IsRemove == 'y' || IsRemove == 'Y')
            file.Write(" -r " + true);

        //author
        Console.WriteLine("Do you want to list the name of the creator of the file as a comment at the top of the target file?(y/n)");
        IsAuthor = char.Parse(Console.ReadLine());
        if (IsAuthor == 'y' || IsAuthor == 'Y')
        {
            Console.WriteLine("Enter the author's file name.");
            author = Console.ReadLine();
            if (author.Length > 0)
                file.Write(" -a " + author);
        }
        file.Close();
        Console.WriteLine($"The response file was created successfully and the process is finished.\n you can find it under the name \"{resName}.rsp\"\r\ngood-luck!");
    }
    catch (System.IO.DirectoryNotFoundException)
    {
        Console.WriteLine("error: file path is invalid");
        Console.WriteLine("exit programing...");
    }
    catch (FormatException ex)
    {
        Console.WriteLine("Error: You may enter only one letter");
        Console.WriteLine("exit programing...");
    }
});

rootCommand.AddCommand(bundleCommand);
rootCommand.AddCommand(createRspCommand);
rootCommand.InvokeAsync(args);



static void WriteToFile(FileInfo output, string author, bool note, List<string> files, bool toRemove, string currentPath)
{
    try
    {
        if (File.Exists(output.FullName))
        {
            Console.WriteLine($"There is already such a file in the path: {output.FullName}.\n" +
              "Would you like to override this file?('y'\\'n')");
            try
            {
                char res = char.Parse(Console.ReadLine());
                while (!(res == 'n' || res == 'N' || res == 'y' || res == 'Y'))
                {
                    Console.WriteLine("This field is required!");
                    res = char.Parse(Console.ReadLine());
                }
                if (res == 'n' || res == 'N')
                {
                    Console.WriteLine("Error: No path to destination received!");
                    throw new Exception("exit programing...");
                    return;
                }
            }
            catch (FormatException ex)
            {
                throw new FormatException("exit programing...");
                return;
            }
        }

        StreamWriter writer = new StreamWriter(output.FullName);
        //write notes: Author, Source file path
        if (!string.IsNullOrEmpty(author))
            writer.WriteLine($"// Author: {author}");
        if (note)
            writer.WriteLine($"// Source file path: {currentPath}");

        //read and write the files content
        StreamReader reader;
        string line;
        for (int i = 0; i < files.Count; i++)
        {
            writer.WriteLine($"// File name: {Path.GetFileName(files[i])}");
            reader = new StreamReader(files[i]);
            while (!reader.EndOfStream)
            {
                line = reader.ReadLine();
                //remove-empty-lines
                if (line != null && (line.Length > 0 || !toRemove))
                    writer.WriteLine(line);
            }
            reader.Close();
        }
        writer.Close();
        //Notification of successful completion
        Console.WriteLine("The file was created successfully in: " + output.FullName);
    }
    catch (DirectoryNotFoundException ex)
    {
        throw new DirectoryNotFoundException("exit programing...");
    }
}
static string[] GetLanguagesExtensions(string langs, string[] allLanguages, string[] allExtensions)
{
    bool isCorrectLang = false;
    if (langs.Equals("all"))
        return allExtensions;
    string[] languages = langs.Split(' ');
    for (int i = 0; i < langs.Length; i++)
    {
        for (int j = 0; j < allLanguages.Length; j++)
        {
            if (languages[i] == allLanguages[j])
            {
                languages[i] = allExtensions[j];
                isCorrectLang = true;
                break;
            }
        }
        if (isCorrectLang)
            isCorrectLang = false;
        else
        {
            string error = $"Error: language named: '{languages[i]}' is not recognized!\n Must be one or more of the following options:";
            error += $" \"all\", \"c#\", \"c\", \"c++\", \"pyton\", \"java\", \"javascript\", \"html\", \"css\" ";
            Console.WriteLine(error);
        }
    }
    return languages;
}

static List<string> SortFiles(List<string> files, bool IsSortByName)
{
    string temp;
    if (IsSortByName)
        for (int i = 0; i < files.Count; i++)
        {
            for (int j = 0; j < files.Count - i - 1; j++)
            {
                if (Path.GetFileName(files[j]).CompareTo(Path.GetFileName(files[j + 1])) > 0)
                {
                    temp = files[j];
                    files[j] = files[j + 1];
                    files[j + 1] = temp;
                }
            }
        }
    else
        for (int i = 0; i < files.Count; i++)
        {
            for (int j = 0; j < files.Count - i - 1; j++)
            {
                if (Path.GetExtension(files[j]).CompareTo(Path.GetExtension(files[j + 1])) > 0)
                {
                    temp = files[j];
                    files[j] = files[j + 1];
                    files[j + 1] = temp;
                }
            }
        }
    return files;
}




























//commonts
//Console.WriteLine("File was created in: " + output.FullName);
//Console.WriteLine("Error: You may enter only one letter");
//Console.WriteLine("exit programing...");
/*Console.WriteLine("Enter a new destination routing");
       newPath = Console.ReadLine();
       Path.Join(newPathFileInfo.FullName, newPath);
       Path p = new Path(newPath);
       newPathFileInfo = new FileInfo(newPath);*/
/*catch (System.ObjectDisposedException ex)
   {
       //    Console.WriteLine("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n");
       throw new ObjectDisposedException("2");
   }

   // catch (Exception ex)
   // {
   //Console.WriteLine(ex.ToString()); 
   // Console.WriteLine("2");
   // }*/
/*catch(Exception ex)
{
    Console.WriteLine("Error: throws an exeption: "+ex.Message);
    throw new Exception("exit programing");
    return false;
}
catch (IOException ex)
{
    Console.WriteLine("Error: An IOExeption");
    throw new DirectoryNotFoundException("exit programing");
}
catch (SecurityException ex)
{
    Console.WriteLine("Error: A Security exeption");
    throw new DirectoryNotFoundException("exit programing");
}*/
/*Console.WriteLine("hello! We make a response file. would you like to give the response file a name?(y/n)");
IsResName = char.Parse(Console.ReadLine());
if (IsResName == 'n' || IsResName == 'N')
{
    Console.WriteLine("Ok, The default file name will be \"response.rsp\"");
}
else if (IsResName == 'y' || IsResName == 'Y')
{
    Console.WriteLine("Ok, Please enter the name you wish to give to the response file:");
}
else
{
    Console.WriteLine("Your response did not match the required format.\r\nYou must press y/n only! If you want to try again\r Press y");
    IsResName2 = char.Parse(Console.ReadLine());
    if (IsResName2 == 'y' || IsResName2 == 'Y')
    {
        Console.WriteLine("Ok, you can try again\r\nDo you want to choose a name for the file (Y/N)?  ");
        IsResName = char.Parse(Console.ReadLine());
        if (IsResName == 'n' || IsResName == 'N')
        {

        }
        else if (IsResName == 'y' || IsResName == 'Y')
        {

        }
    }
}*/



        //StreamWriter file = new StreamWriter("responseFile.rsp");